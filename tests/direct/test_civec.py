import pytest


def test_global_registry_and_cross_wallet_owner_guard(direct_vm, direct_deploy, direct_alice, direct_bob):
    contract = direct_deploy("contracts/civec.py")
    direct_vm.sender = direct_alice
    contract.create_proposal("owner-test", "Bridge", "Ward 4", "Repair it", "Safety")

    records = contract.list_proposals()
    assert len(records) == 1
    assert records[0]["owner"].lower() == ("0x" + direct_alice.hex()).lower()

    with direct_vm.prank(direct_bob):
        with direct_vm.expect_revert("caller is not the proposal owner"):
            contract.add_evidence("owner-test", "https://example.com/evidence")
        with direct_vm.expect_revert("caller is not the proposal owner"):
            contract.close_proposal("owner-test")


def test_closed_records_reject_endorsement(direct_vm, direct_deploy, direct_alice, direct_bob):
    contract = direct_deploy("contracts/civec.py")
    direct_vm.sender = direct_alice
    contract.create_proposal("closed-test", "Road", "Ward 1", "Repair it", "Access")
    contract.close_proposal("closed-test")

    with direct_vm.prank(direct_bob):
        with direct_vm.expect_revert("proposal is closed"):
            contract.endorse("closed-test")


def test_unavailable_evidence_abstains(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/civec.py")
    direct_vm.sender = direct_alice
    contract.create_proposal("abstain-test", "Footbridge", "Ward 2", "Repair it", "Safety")
    contract.add_evidence("abstain-test", "https://unavailable.example/evidence")
    direct_vm.mock_web(r"unavailable\.example", {"status": 503, "body": ""})
    direct_vm.mock_llm(r".*", '{"status":"SCREENED","reason":"unsupported"}')
    result = contract.request_screening("abstain-test")
    assert result["status"] == "ABSTAINED"


def test_malformed_screening_output_abstains(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/civec.py")
    direct_vm.sender = direct_alice
    contract.create_proposal("malformed-test", "Crossing", "Ward 3", "Improve access", "Safety")
    contract.add_evidence("malformed-test", "https://credible.example/report")
    direct_vm.mock_web(r"credible\.example", {"status": 200, "body": "A public planning report supporting the proposal."})
    direct_vm.mock_llm(r".*", "not-json")
    result = contract.request_screening("malformed-test")
    assert result["status"] == "ABSTAINED"
    assert "malformed" in result["reason"].lower()


def test_abstained_proposal_can_correct_and_rescreen(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/civec.py")
    direct_vm.sender = direct_alice
    contract.create_proposal("recovery-test", "Crossing", "Ward 3", "Improve access", "Safety")
    contract.add_evidence("recovery-test", "https://bad.example/report")
    direct_vm.mock_web(r"bad\.example", {"status": 503, "body": ""})
    assert contract.request_screening("recovery-test")["status"] == "ABSTAINED"
    contract.replace_evidence("recovery-test", 0, "https://credible.example/report")
    direct_vm.clear_mocks()
    direct_vm.mock_web(r"credible\.example", {"status": 200, "body": "A public planning report supporting the proposal."})
    direct_vm.mock_llm(r".*", '{"status":"SCREENED","reason":"Qualified public evidence supports the proposal."}')
    result = contract.rescreen_proposal("recovery-test")
    assert result["status"] == "SCREENED"
    assert contract.get_proposal("recovery-test")["evidence"][0] == "https://credible.example/report"
