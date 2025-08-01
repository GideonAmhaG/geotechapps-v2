"""
Module for managing foundation calculations using a FastAPI web application.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import multiprocessing
import concurrent.futures
from functools import partial
from foundations.isolated import iso

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5000",
        "https://your-node-production-url.com"
    ],
    allow_methods=["POST"]
)

# Timeout configuration
CALCULATION_TIMEOUT = 10  # seconds

def run_iso_in_process(**kwargs):
    """Run the iso function in a separate process with timeout handling."""
    try:
        return iso(**kwargs)
    except Exception as e:
        return {"error": str(e)}

@app.post("/calculate/isolated")
async def calculate_isolated(data: dict):
    """
    Endpoint to calculate isolated footing parameters with timeout protection.
    
    Args:
        data (dict): Input data containing soil type and various parameters for the calculation.

    Returns:
        dict: Success status and calculated data, or raises HTTP exceptions for errors.
    """
    try:
        soil_mapping = {
            "CU": "clay",
            "CD": "sand",
            "S": "sand",
            "CUST": "bearing_c"
        }
        
        # Get soilType from either top level or inputs
        soil_type_input = data.get("soilType", "").upper()
        if not soil_type_input:
            raise HTTPException(400, detail="Missing soilType parameter")
            
        if soil_type_input not in soil_mapping:
            raise HTTPException(400, detail=f"Invalid soilType: {soil_type_input}")
        
        soil_type = soil_mapping[soil_type_input]

        converted = {
            "DL": float(data["DL"]),
            "LL": float(data["LL"]),
            "mxp": float(data.get("mxp", 0)),
            "mxv": float(data.get("mxv", 0)),
            "myp": float(data.get("myp", 0)),
            "myv": float(data.get("myv", 0)),
            "colx": float(data["colx"]) / 1000,
            "coly": float(data["coly"]) / 1000,
            "fck": float(data["fck"]),
            "fyk": float(data["fyk"]),
            "bar": float(data["bar"]),
            "covr": float(data["covr"]),
            "soil_type": soil_type,
            "Df": float(data["Df"]) / 1000,
            "gamma": float(data["gamma"])
        }

        if soil_type == "clay":
            converted["cu"] = float(data["CU"])
        elif soil_type == "sand":
            converted["phi_f"] = float(data.get("PHI", 30))
        elif soil_type == "bearing_c":
            converted["bc"] = float(data.get("bc", 150))

        # Run the calculation in a separate process with timeout
        with multiprocessing.Pool(1) as pool:
            try:
                result = pool.apply_async(iso, kwds=converted)
                # Wait for the result with timeout
                result = result.get(timeout=CALCULATION_TIMEOUT)
            except multiprocessing.TimeoutError:
                raise HTTPException(408, detail="Calculation timed out. Iterations are diverging. Adjust inputs in the Inputs tab and try again.")
            except Exception as e:
                raise HTTPException(500, detail=f"Calculation error: {str(e)}")
        
        if not result:
            raise HTTPException(400, detail="Invalid input values")
            
        return {"success": True, "data": result}
        
    except KeyError as e:
        raise HTTPException(400, detail=f"Missing parameter: {str(e)}")
    except HTTPException:
        raise  # Re-raise existing HTTP exceptions
    except Exception as e:
        raise HTTPException(500, detail=f"Unexpected error: {str(e)}")
    