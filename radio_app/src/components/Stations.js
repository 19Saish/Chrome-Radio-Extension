import React, { useEffect, useState } from "react";
import RadioStations from "../RadioStations.json";
import classes from "./Stations.module.css";

import RadioBackground from "../Images/RadioBackground.jpg";

const Stations = () => {
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isYoutube, setIsYoutube] = useState(false);

  // const selectStation = (station) => {
  //   if (audio) {
  //     audio.pause();
  //   }
  //   const newAudio = new Audio(station?.RadioLink);
  //   setAudio(newAudio);
  //   setCurrentStation(station);
  //   newAudio.play();
  //   setIsPlaying(!isPlaying);
  // };

  // useEffect(() => {
  //   if (currentStation?.RadioLink) {
  //     const newAudio = new Audio(currentStation?.RadioLink);
  //     setAudio(newAudio);
  //   }
  // }, [currentStation]);

  const handleStation = (station) => {
    if (station) {
      setCurrentStation(station);
      setAudio(station?.RadioLink);
      setIsYoutube(false);
    }
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (currentStation?.RadioLink.includes("youtube")) {
      setIsYoutube(true);
    }
  }, [currentStation]);

  return (
    <div className={classes.container}>
      {currentStation && (
        <div className={classes.controls}>
          <h2>Now Playing: {currentStation?.StationTitle}</h2>
          <div>
            {isYoutube ? (
              <a
                href={currentStation?.RadioLink}
                target="_blank"
                rel="noreffer noreferrer"
              >
                Listen to Sri Sathya Sai Bhajans
              </a>
            ) : (
              <audio src={audio} autoPlay controls className={classes.audio}>
                <button onClick={handlePlay}>
                  {isPlaying ? "Pause" : "Play"}
                </button>
              </audio>
            )}
          </div>
        </div>
      )}
      <div className={classes.block}>
        {RadioStations.map((station, index) => (
          <div
            key={index}
            className={classes.card}
            onClick={() => handleStation(station)}
          >
            <img
              className={classes.radioImg}
              src={station?.ImageLink ? station?.ImageLink : RadioBackground}
              alt={station?.StationTitle}
            />
            <div className={classes.title}>{station?.StationTitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stations;
