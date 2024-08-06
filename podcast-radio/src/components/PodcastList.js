import React from 'react';
import PodcastItem from './PodcastItem';

const PodcastList = ({ podcasts, onEditPodcast, onDeletePodcast }) => {
    return (
        <div className="podcast-list">
            <h2>Podcast List</h2>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Audio</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {podcasts.map((podcast) => (
                    <PodcastItem
                        key={podcast.id}
                        podcast={podcast}
                        onEditPodcast={onEditPodcast}
                        onDeletePodcast={onDeletePodcast}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PodcastList;
