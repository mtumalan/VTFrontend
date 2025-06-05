import { useState } from "react";

export default function AiChat() {
	const [selectedModel, setSelectedModel] = useState("Modelo 1");
	const [file, setFile] = useState(null);

	const handleModelChange = (e) => setSelectedModel(e.target.value);
	const handleFileChange = (e) => setFile(e.target.files[0]);
	const handleSend = () => {
		alert(`Modelo: ${selectedModel}\nArchivo: ${file ? file.name : "Ninguno"}`);
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				background: "linear-gradient(135deg, #3a176a 0%, #181818 100%)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column"
			}}
			className="ai-chat-bg"
		>
			<h1 style={{
				color: "#fff",
				fontSize: "2.2rem",
				fontWeight: 700,
				marginBottom: 32,
				letterSpacing: "0.01em",
				textAlign: "center"
			}}>
				Analiza tu imagen
			</h1>
			<div style={{
				background: "#181828",
				borderRadius: 12,
				padding: 32,
				boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
				width: "100%",
				maxWidth: 700,
				display: "flex",
				flexDirection: "column",
				gap: 20
			}}>
				<select
					value={selectedModel}
					onChange={handleModelChange}
					style={{
						width: "100%",
						borderRadius: 12,
						border: "1.5px solid #4f8cff",
						background: "#13131a",
						color: "#fff",
						padding: 16,
						fontSize: 18,
						marginBottom: 8,
						boxSizing: "border-box"
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
				<input
					type="file"
					onChange={handleFileChange}
					style={{
						color: "#fff",
						marginBottom: 8
					}}
				/>
				<div style={{ display: "flex", gap: 16 }}>
					<button
						onClick={handleSend}
						className="ai-chat-btn"
						style={{
							flex: 1
						}}
					>
						Enviar
					</button>
				</div>
				{file && (
					<div style={{ color: "#aaa", fontSize: 14 }}>
						Archivo seleccionado: {file.name}
					</div>
				)}
			</div>
			<style jsx global>{`
				.ai-chat-bg {
					background: linear-gradient(135deg, #3a176a 0%, #181818 100%) !important;
				}
				.ai-chat-btn {
					background: linear-gradient(90deg, #6f2bff 0%, #4f8cff 100%);
					color: #fff;
					border: none;
					border-radius: 8px;
					padding: 14px 0;
					font-weight: 700;
					font-size: 1.1rem;
					letter-spacing: 0.02em;
					cursor: pointer;
					transition: box-shadow 0.2s, transform 0.2s;
					box-shadow: 0 2px 8px rgba(79,140,255,0.10);
				}
				.ai-chat-btn:hover, .ai-chat-btn:focus {
					box-shadow: 0 4px 16px rgba(111,43,255,0.18);
					transform: translateY(-2px) scale(1.03);
				}
			`}</style>
		</div>
	);
}

export async function getStaticProps() {
	return { props: { header: "three", footer: "three" } };
}
