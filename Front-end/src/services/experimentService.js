
const API_BASE_URL = "http://127.0.0.1:8000";


async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Something went wrong with the API request.");
  }

  return data;
}


export async function runExperiment(modelName) {
  return apiRequest("/experiments/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model_name: modelName,
    }),
  });
}


export async function getExperiments() {
  return apiRequest("/experiments");
}
