from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from foundations.isolated import iso  # Calculation module

app = FastAPI()

# CORS Configuration (allow Node.js and frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5000",  # Node.js dev
        "https://your-node-production-url.com"  # Production
    ],
    allow_methods=["POST"]
)

@app.post("/calculate/isolated")
async def calculate_isolated(data: dict):
    try:
        # Convert and map all parameters
        converted = {
            "DL": data["DL"],
            "LL": data["LL"],
            "mxp": data.get("mxp", 0),  # Default to 0 if not provided
            "mxv": data.get("mxv", 0),
            "myp": data.get("myp", 0),
            "myv": data.get("myv", 0),
            "colx": data.get("colx", 300) / 1000,  # Convert mm to m
            "coly": data.get("coly", 300) / 1000,
            "fck": data.get("fck", 25),
            "fyk": data.get("fyk", 500),
            "bar": data.get("bar", 16),
            "covr": data.get("covr", 75),
            "soil_type": data["soilType"].lower(),  # Convert to lowercase
            "cu": data.get("CU") if data["soilType"].upper() == "CU" else None,
            "phi_f": data.get("PHI_PRIME") if data["soilType"].upper() in ["CD", "S"] else None,
            "Df": data.get("Df", 1500) / 1000,
            "gamma": data.get("gamma", 18),
            "bc": data.get("bc") if data["soilType"].upper() == "CUST" else None
        }
        
        result = iso(**converted)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(500, detail=f"Calculation failed: {str(e)}")
    