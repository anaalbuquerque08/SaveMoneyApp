import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Header from "../Components/Home/Header";
import SubtitleContainer from "../Components/General/SubtitleContainer";
import AcquisitionCard from "../Components/Home/AcquisitionCard";
import EmptyState from "../Components/States/EmptyState";
import emptyStates from "../constants/emptyStates";
import subtitleStates from "../constants/subtitleStates";
import DepositBox from "../Components/States/DepositBox";
import depositStates from "../constants/depositStates";

import "../styles/general/variables.css";
import HomeFadeIn from "../Components/General/AnimatedPage/HomeFadeIn";

export default function HomePage() {
  const [homeState] = useState("goalNoDeposit"); // "empty" | "goalNoDeposit" | "complete"
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Header showButton={false} />
      <HomeFadeIn>
        {homeState === "empty" && (
          <EmptyState
            text={emptyStates.goals.text}
            buttonLabel={emptyStates.goals.buttonLabel}
            onClick={() => navigate(emptyStates.goals.route)}
          />
        )}

        {homeState === "goalNoDeposit" && (
          <>
            <SubtitleContainer text={subtitleStates.goals.text} showButton={true} />


            <AcquisitionCard />
            <SubtitleContainer text={subtitleStates.deposit.text} showButton={false} />
            <DepositBox>
              <EmptyState
                text={emptyStates.deposit.text}
                buttonLabel={emptyStates.deposit.buttonLabel}
                onClick={() => navigate(emptyStates.deposit.route)}
              />
            </DepositBox>
          </>
        )}

        {homeState === "complete" && (
          <>
            <SubtitleContainer text={subtitleStates.goals.text} showButton={true} />
            <AcquisitionCard />
            <SubtitleContainer text={subtitleStates.deposit.text} showButton={false} />
            <DepositBox>
              {depositStates.withDeposit.content}
            </DepositBox>
          </>
        )}
      </HomeFadeIn>
    </div>
  );
}
