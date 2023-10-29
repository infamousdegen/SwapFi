import UnifiedNavbar from "./UnifiedNavbar";
import React, { useState } from "react";
import styles from "../assets/styles/Pools.module.css";
import Link from "next/link";

const Pools: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.head}>
          <h1>Pools</h1>
        </div>
        <div className={styles.controlsContainer}>
          <div className={styles.customDropdown}>
            <select
              id="options"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="migrateV2">Migrate V2</option>
              <option value="liquidity">Liquidity</option>
            </select>
          </div>
          <Link href="/liquidity">
            <button className={styles.newPositionButton}>+ New Position</button>
          </Link>
        </div>
      </div>
      <div className={styles.rectangle}>
        <p className={styles.centeredText}>
          Your active V2 liquidity positions will appear here.
        </p>
      </div>
    </div>
  );
};

export default Pools;
