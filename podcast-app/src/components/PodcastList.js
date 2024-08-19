import React, { useContext, useEffect, useState } from "react";
import { PodcastContext } from "../context/PodcastContext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import AddPodcast from "./AddPodcast";
import UpdatePodcast from "./UpdatePodcast";
import { InputText } from "primereact/inputtext";
import Header from "../components/Header";

const PodcastList = () => {
  const {
    podcasts,
    fetchPodcasts,
    addDialog,
    setAddDialog,
    editDialog,
    setEditDialog,
    selectedPodcast,
    setSelectedPodcast,
    deletePodcast,
  } = useContext(PodcastContext);

  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  useEffect(() => {
    setFilteredPodcasts(
      podcasts.filter(
        (podcast) =>
          (podcast.title &&
            podcast.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (podcast.description &&
            podcast.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())),
      ),
    );
  }, [podcasts, searchTerm]);

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => {
            setSelectedPodcast(rowData);
            setEditDialog(true);
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => deletePodcast(rowData.id)}
        />
      </div>
    );
  };

  const audioBodyTemplate = (rowData) => {
    return (
      <audio controls>
        <source
          src={`http://localhost:5000${rowData.audio_url}`}
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    );
  };

  return (
    <div className="podcast-list">
      <div style={{ paddingTop: "60px", padding: "20px" }}>
        <Header />
        <div className="p-grid p-justify-between p-align-center podcast-header">
          <div className="p-col-6 p-text-right">
            <InputText
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or description"
              className="p-inputtext-sm search-input"
            />
          </div>
        </div>{" "}
        <DataTable value={filteredPodcasts} responsiveLayout="scroll">
          <Column field="title" header="Title" sortable />
          <Column field="description" header="Description" sortable />
          <Column body={audioBodyTemplate} header="Audio" />
          <Column body={actionBodyTemplate} header="Actions" />
        </DataTable>
        <Dialog
          header="Add Podcast"
          visible={addDialog}
          style={{ width: "50vw" }}
          onHide={() => setAddDialog(false)}
        >
          <AddPodcast onHide={() => setAddDialog(false)} />
        </Dialog>
        <Dialog
          header="Edit Podcast"
          visible={editDialog}
          style={{ width: "50vw" }}
          onHide={() => setEditDialog(false)}
        >
          <UpdatePodcast
            podcast={selectedPodcast}
            onHide={() => setEditDialog(false)}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default PodcastList;
