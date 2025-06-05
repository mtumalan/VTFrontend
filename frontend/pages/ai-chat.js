import { useState } from "react";

export default function AiChat() {
	const [selectedModel, setSelectedModel] = useState("Modelo 1");
	const [file, setFile] = useState(null);

	const handleModelChange = (e) => setSelectedModel(e.target.value);
	const handleFileChange = (e) => setFile(e.target.files[0]);
	const handleSend = () => {
		const modelId = [
			"0",
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8"
		].indexOf(selectedModel);

		if (!file) {
			alert("Por favor selecciona una imagen.");
			return;
		}

		const formData = new FormData();
		formData.append("model_id", modelId);
		formData.append("file", file);

		// Aquí puedes hacer el fetch real, por ahora solo mostramos el contenido
		alert(`Modelo: ${selectedModel}\nID: ${modelId}\nArchivo: ${file.name}`);

		// Ejemplo de envío:
		// fetch("/api/tu-endpoint", {
		//   method: "POST",
		//   body: formData
		// }).then(...);
	};

	return (
		<div className="fugu--inner-section dark-version" style={{ minHeight: '100vh', display: 'flex' }}>
			<div style={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center', // centra verticalmente
				minHeight: '100vh'    // asegura altura completa
			}}>
				<div className="col-lg-6">
					<div className="fugu--contact-form wow fadeInUpX" data-wow-delay="0.15s">
						<h3 style={{ color: "#fff", textAlign: "left", marginBottom: 15 }}>Analiza tu imagen</h3>
						<form>
							<div className="fugu--comment-field">
								<label htmlFor="model-select" style={{ color: "#fff", marginBottom: 8, display: "block" }}>Selecciona un modelo</label>
								<select
									id="model-select"
									value={selectedModel}
									onChange={handleModelChange}
									className="form-control"
									style={{
										background: "#181828",
										color: "#fff",
										borderRadius: 8,
										border: "1.5px solid #4f8cff",
										padding: 12,
										fontSize: "1rem",
										marginBottom: 16
									}}
								>
									<option>Modelo 1</option>
									<option>Modelo 2</option>
									<option>Modelo 3</option>
									<option>Modelo 4</option>
									<option>Modelo 5</option>
									<option>Modelo 6</option>
									<option>Modelo 7</option>
									<option>Modelo 8</option>
									<option>Modelo 9</option>
								</select>
							</div>
							<div className="fugu--comment-field">
								<label htmlFor="file-upload" style={{ color: "#fff", marginBottom: 8, display: "block" }}>Seleccionar archivo</label>
								<input
									id="file-upload"
									type="file"
									onChange={handleFileChange}
									className="form-control"
									style={{
										background: "#181828",
										color: "#fff",
										borderRadius: 8,
										border: "1.5px solid #4f8cff",
										padding: 12,
										fontSize: "1rem"
									}}
								/>
							</div>
							<button
								type="button"
								onClick={handleSend}
								id="fugu--form-submit-btn"
								style={{ color: 'white' }} className="link-button"
							>
								Enviar
							</button>
							{file && (
								<div style={{ color: "#aaa", fontSize: 14, marginTop: 12 }}>
									Archivo seleccionado: {file.name}
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
			{/* Mantén los shapes decorativos si los quieres */}
			<div className="fugu--blog-shape1">
				<img src="/images/all-img/v3/shape2.png" alt="" />
			</div>
			<div className="fugu--blog-shape3">
				<img src="/images/all-img/blog2/shape.png" alt="" />
			</div>
		</div>
	);
}

export async function getStaticProps() {
	return { props: { header: "three", footer: "three" } };
}
