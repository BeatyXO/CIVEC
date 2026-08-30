# { "Depends": "py-genlayer:test" }
from genlayer import *

class Probe(gl.Contract):
    records: TreeMap[Address, str]
    def __init__(self):
        pass
    @gl.public.write
    def put(self, value: str) -> None:
        self.records[gl.message.sender_address] = value
    @gl.public.view
    def get(self, owner: str) -> str:
        return self.records.get(Address(owner), "")
