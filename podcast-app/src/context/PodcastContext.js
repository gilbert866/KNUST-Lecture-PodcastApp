// src/context/PodcastContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/podcasts';

export const PodcastContext = createContext();

export const PodcastProvider = ({ children }) => {
    const [podcasts, setPodcasts] = useState([]);
    const [addDialog, setAddDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [selectedPodcast, setSelectedPodcast] = useState(null);

    useEffect(() => {
        fetchPodcasts();
    }, []);

    const fetchPodcasts = async () => {
        try {
            const response = await axios.get(API_URL);
            setPodcasts(response.data);
        } catch (error) {
            console.error('Error fetching podcasts:', error);
        }
    };

    const addPodcast = async (formData) => {
        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPodcasts([...podcasts, response.data]);
        } catch (error) {
            console.error('Error adding podcast:', error);
        }
    };

    const editPodcast = async (updatedPodcast) => {
        try {
            const response = await axios.put(`${API_URL}/${updatedPodcast.id}`, updatedPodcast);
            setPodcasts(
                podcasts.map((podcast) =>
                    podcast.id === updatedPodcast.id ? response.data : podcast
                )
            );
        } catch (error) {
            console.error('Error editing podcast:', error);
        }
    };

    const deletePodcast = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setPodcasts(podcasts.filter((podcast) => podcast.id !== id));
        } catch (error) {
            console.error('Error deleting podcast:', error);
        }
    };

    return (
        <PodcastContext.Provider
            value={{
                podcasts,
                addDialog,
                setAddDialog,
                editDialog,
                setEditDialog,
                selectedPodcast,
                setSelectedPodcast,
                fetchPodcasts,
                addPodcast,
                editPodcast,
                deletePodcast
            }}
        >
            {children}
        </PodcastContext.Provider>
    );
};
