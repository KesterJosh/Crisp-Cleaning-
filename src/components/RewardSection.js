import React, { useState } from "react";
import "./rewardSection.css";

const rewardsPerPage = 3;

const RewardSection = ({
  rewards,
  claimReward,
  handleMouseEnterFade,
  handleMouseLeaveFade,
}) => {
  const [page, setPage] = useState(0);

  const maxPage = Math.ceil(rewards.length / rewardsPerPage) - 1;
  const paginatedRewards = rewards.slice(
    page * rewardsPerPage,
    page * rewardsPerPage + rewardsPerPage
  );

  return (
    <div className="reward-container63">
      <div className="reward-container65">
        <div className="reward-container602">
          <img
            alt="image"
            src={require("../views/img/reward-200w.png")}
            className="reward-image28"
          />
          <span className="reward-text45">Rewards</span>
        </div>

        {rewards.length > 0 ? (
          <>
            <div className="reward_container_main">
              {paginatedRewards.map((reward) => (
                <div key={reward._id} className="reward-container67">
                  <div className="reward-container70">
                    <span className="reward-text48">
                      <strong>{reward.rewardDescription}</strong>
                      <br />
                      {reward.completed} of {reward.required}{" "}
                      {reward.challengeType}
                    </span>
                  </div>

                  <div
                    className={`reward-container71 ${
                      reward.claimed
                        ? "claimed"
                        : reward.completed < reward.required
                        ? "disabled"
                        : ""
                    }`}
                    onClick={() =>
                      !reward.claimed &&
                      reward.completed >= reward.required &&
                      claimReward(reward._id)
                    }
                    onMouseEnter={(e) =>
                      !reward.claimed &&
                      reward.completed >= reward.required &&
                      handleMouseEnterFade(e.currentTarget)
                    }
                    onMouseLeave={(e) =>
                      !reward.claimed &&
                      reward.completed >= reward.required &&
                      handleMouseLeaveFade(e.currentTarget)
                    }
                  >
                    <span className="reward-text52">
                      {reward.claimed ? (
                        "Claimed"
                      ) : reward.completed >= reward.required ? (
                        "Claim reward"
                      ) : (
                        <img
                          src="/img/lock.png"
                          className="not-ready"
                          alt="locked"
                        />
                      )}
                    </span>
                  </div>
                </div>
              ))}

              {/* Navigation Buttons */}
              <div className="reward-pagination-controls">
                <button
                  className="reward-prev-btn"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  disabled={page === 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#fff"
                    viewBox="0 0 256 256"
                  >
                    <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                  </svg>
                </button>
                <button
                  className="reward-next-btn"
                  onClick={() => setPage((prev) => Math.min(prev + 1, maxPage))}
                  disabled={page >= maxPage}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#fff"
                    viewBox="0 0 256 256"
                  >
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="reward-no-reward-message">
            <p>
              No rewards available at the moment. Complete some challenges to
              earn rewards!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardSection;
