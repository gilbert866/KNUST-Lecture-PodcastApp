// src/components/UpdatePodcast.js
import React, { useState, useContext, useEffect } from "react";
import { PodcastContext } from "../context/PodcastContext";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import "./UpdatePodcast.css"; // Import the CSS file

const UpdatePodcast = ({ podcast, onHide }) => {
    const { editPodcast } = useContext(PodcastContext);
    const [title, setTitle] = useState(podcast.title);
    const [description, setDescription] = useState(podcast.description);
    const [audio, setAudio] = useState(null);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if (audio) formData.append("audio", audio);

        await editPodcast({ ...podcast, title, description, audio });
        onHide();
    };

    useEffect(() => {
        setTitle(podcast.title);
        setDescription(podcast.description);
    }, [podcast]);

    return (
        <div className="form-container">
            <h2>Update Podcast</h2>
            <div className="p-field">
                <label htmlFor="title">Title</label>
                <InputText
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-text"
                />
            </div>

            <div className="p-field">
                <label htmlFor="description">Description</label>
                <InputText
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-text"
                />
            </div>

            <div className="p-field">
                <label htmlFor="audio">Audio</label>
                <FileUpload
                    mode="basic"
                    accept="audio/*"
                    customUpload
                    uploadHandler={(e) => setAudio(e.files[0])}
                    className="file-upload"
                />
            </div>

            <Button label="Update Podcast" onClick={handleSubmit} className="submit-button" />
        </div>
    );
};

export default UpdatePodcast;
