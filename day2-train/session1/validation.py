import asyncio
from typing import Tuple
from datetime import datetime
import re
 
class InvalidNICError(Exception):
    """Raised when NIC format is invalid."""
    pass
 
def validate_nic_format(nic: str) -> bool:
    """
    Validate Sri Lankan NIC format.
    Old: 9 digits + V/X
    New: 12 digits
    """
    # Old format
    if re.match(r'^\d{9}[VX]$', nic):
        return True
    # New format
    if re.match(r'^\d{12}$', nic):
        return True
    return False
 
def extract_birth_year_from_old_nic(nic: str) -> int:
    """
    Extract birth year from old NIC format.
    First 2 digits = year (19XX for years < 50, 20XX for years >= 50)
    """
    if not re.match(r'^\d{9}[VX]$', nic):
        raise InvalidNICError("Invalid old NIC format")
    
    year_digits = int(nic[:2])
    if year_digits < 50:
        return 2000 + year_digits
    return 1900 + year_digits
 
async def validate_nic_async(nic: str) -> Tuple[bool, str]:
    """
    Async NIC validator (simulates database/external API call).
    Returns (is_valid, message).
    """
    await asyncio.sleep(0.1)  # Simulate I/O
    
    if not validate_nic_format(nic):
        return False, "Invalid NIC format"
    
    try:
        if len(nic) == 10:  # Old format
            birth_year = extract_birth_year_from_old_nic(nic)
            age = datetime.now().year - birth_year
            if age < 18:
                return False, f"Customer must be 18+ years old (age: {age})"
        return True, "Valid NIC"
    except InvalidNICError as e:
        return False, str(e)
 
# Testing
async def test_nic_validator():
    test_cases = [
        ("123456789V", True),   # Old format, valid
        ("123456789X", True),   # Old format, valid
        ("123456789", False),   # Old format, missing V/X
        ("123456789012", True), # New format, valid
        ("12345678901", False), # New format, wrong length
    ]
    
    for nic, expected in test_cases:
        is_valid, message = await validate_nic_async(nic)
        print(f"NIC: {nic:15} | Valid: {is_valid:5} | Message: {message}")
 
if __name__ == "__main__":
    asyncio.run(test_nic_validator())

