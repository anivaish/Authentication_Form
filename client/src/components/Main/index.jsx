import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const [image, setImage] = useState(null);
	const [allImage, setAllImage] = useState(null);

	useEffect(() => {
		getImage();
	}, []);
	const submitImage = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("image", image);

		const result = await axios.post(
			"http://localhost:8080/upload-image",
			formData,
			{
				headers: { "Content-Type": "multipart/form-data" },
			}
		);
	};

	const onInputChange = (e) => {
		console.log(e.target.files[0]);
		setImage(e.target.files[0]);
	};

	const getImage = async () => {
		const result = await axios.get("http://localhost:8080/get-image");
		console.log(result);
		setAllImage(result.data.data);
	};


	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>fakebook</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<form onSubmit={submitImage}>
				<input type="file" accept="image/*" onChange={onInputChange}></input>
				<button type="submit">Submit</button>
			</form>
			{allImage == null
				? ""
				: allImage.map((data) => {
					return (
						<img
							src={require(`./images/${data.image}`)}
							height={200}
							width={200}
						/>
					);
				})}
		</div>
	);
};

export default Main;
