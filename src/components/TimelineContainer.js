import React from "react";
import "./Timeline.css";

const stops = [
  { id: 1, label: "$10 credit", type: "little" },
  { id: 2, label: "Free clean", type: "little" },
  { id: 3, label: "Cheap cleans for life!", type: "big" },
  { id: 4, label: "Free clean", type: "little" },
  { id: 5, label: "$15 credit", type: "little" },
  { id: 6, label: "Even cheaper cleans... for life!", type: "big" },
  { id: 7, label: "free clean", type: "little" },
  { id: 8, label: "$20 credit", type: "little" },
  { id: 9, label: "It's basically free.", type: "big" },
];

const completedIds = [];

const TimelineContainer = () => {
  const totalStops = stops.length;
  const lastCompletedIndex = stops.findIndex(
    (stop) => !completedIds.includes(stop.id)
  );
  const progressIndex =
    lastCompletedIndex === -1 ? totalStops : lastCompletedIndex;
  const progressPercent = ((progressIndex - 1) / (totalStops - 1)) * 100;

  return (
    <div className="timeline-wrapper">
      <div className="timeline">
        {/* Main line background */}
        <div className="timeline-line-bg"></div>
        {/* Progress fill */}
        <div
          className="timeline-line-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>

        {/* Stops */}
        {stops.map((stop, index) => {
          const isCompleted = completedIds.includes(stop.id);
          const positionPercent = (index / (totalStops - 1)) * 100;
          return (
            <React.Fragment key={index}>
              {/* Connector */}
              <div
                className={`timeline-connector ${stop.type} ${
                  isCompleted ? "active" : ""
                }`}
                style={{ left: `${positionPercent}%` }}
              ></div>

              <div
                className={`timeline-stop ${
                  stop.type === "big" ? "big-win" : "little-win"
                } ${isCompleted ? "completed" : ""}`}
                style={{ left: `${positionPercent}%` }}
              >
                {/* Stop circle – label only for little wins */}
                {stop.type === "little" && (
                  <div className="stop-circle">{stop.label}</div>
                )}
                {/* Text bubble above big wins */}
                {stop.type === "big" && (
                  <div
                    className={`text-bubble ${
                      isCompleted ? "completed-bubble" : "incomplete-bubble"
                    }`}
                  >
                    {stop.label}
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineContainer;
