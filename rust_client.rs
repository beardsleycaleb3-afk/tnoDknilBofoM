use reqwest;
use serde_json::Value;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let data: Value = reqwest::get("http://localhost:8080/three")?.json().await?;
    println!("{:?}", data["geometry"]);  // hexocta mesh
    Ok(())
}
