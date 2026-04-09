from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

app = FastAPI(
    title="PSLTP Customer Service",
    description="Health and Echo API for Session 02",
    version="1.0.0"
)

class EchoRequest(BaseModel):
    """Schema for the echo request body."""
    message: str

@app.get("/api/v1/health")
async def health_check():
    """
    Return health status of the service.
    
    Returns:
        dict: A status message and service identifier.
    """
    return {
        "status": "ok", 
        "service": "psltp-customer"
    }

@app.post("/api/v1/echo")
async def echo(request: EchoRequest):
    """
    Echo back the JSON request body with a timestamp.
    
    Args:
        request (EchoRequest): The validated JSON body.
        
    Returns:
        dict: The echoed message and current ISO timestamp.
    """
    return {
        "echo": request.message, 
        "timestamp": datetime.now().isoformat()
    }
