/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useRouter } from "next/router";
import { useAccount, useNetwork } from "wagmi";
import styles from "../assets/styles/Liquidity.module.css";
import useIsMounted from "./hooks/useIsMounted";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faGear,
  faSearch,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import uniswapv2Router from "./abi/UniswapV2Router02.json";

const Swap: React.FC = () => {
  const router = useRouter();
  const mounted = useIsMounted();
  const account = useAccount();

  const [payCoin, setPayCoin] = useState("ETH");
  const [receiveCoin, setReceiveCoin] = useState("XDC");
  const [tokenA, setTokenA] = useState<string>(""); // Ensure it's a string
  const [tokenB, setTokenB] = useState<string>(""); // Ensure it's a string
  const [tokenAS, setTokenAS] = useState<bigint>(BigInt(0));
  const [tokenBS, setTokenBS] = useState<bigint>(BigInt(0));
  const [showPayModal, setShowPayModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCoins, setFilteredCoins] = useState<string[]>([]);
  const [maxSlippage, setMaxSlippage] = useState<bigint>(BigInt(0));
  const [transactionDeadline, setTransactionDeadline] = useState<string>(""); // Ensure it's a string
  const handleMaxSlippageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Convert the input value to a bigint
    const parsedValue = BigInt(inputValue);
    setMaxSlippage(parsedValue);
  };

  const handleTransactionDeadlineChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransactionDeadline(e.target.value);
  };

  const closeModal = () => {
    setShowPayModal(false);
    setShowReceiveModal(false);
  };
  const iconStyle = {
    transform: "rotate(90deg)",
  };

  const addresses = [
    "0x8Ef01C8a344fb9996d919Be082C6632f8383dA2d",
    "0xe99500ab4a413164da49af83b9824749059b46ce",
  ];

  const availableCoins = ["ETH", "wXDC"];

  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  const getIconForCoin = (coin: string) => {
    switch (coin) {
      case "ETH":
        return "ethereum.png";
      case "wXDC":
        return "xdc.png";
      default:
        return "xdc.png";
    }
  };

  const openSettingsDropdown = () => {
    setShowSettingsDropdown(true);
  };


  const { config: addLiquidityConfig, error: addLiquidityError } =
    usePrepareContractWrite({
      address: "0xE72F49482Bec79A6b16d5727A51D97EdCe2E7Ba9",
      abi: uniswapv2Router.abi,
      functionName: "addLiquidity",
      chainId: 51,
      args: [
        "0x6c726338Df61492f0e30F87CbA7EB111C69D3474",
        "0xe99500ab4a413164da49af83b9824749059b46ce",
        tokenAS,
        tokenBS,
        tokenAS,
        tokenBS,
        account.address,
        BigInt(1699537124),
      ],
      onSettled(data, error) {
        console.log("addLiquidity", { data, error });
      },
    });
  const {
    write: addLiquidity,
    isLoading: isaddLiquidityLoading,
    data: addLiquidityData,
    isSuccess: addLiquiditySuccess,
  } = useContractWrite(addLiquidityConfig);


  const addLiquidityFunction = () => {
    console.log("inside add add liquidity");
    if (addLiquidity !== undefined) {
      addLiquidity();
      console.log("adrer add liquidity");
    }
  };

  const closeSettingsDropdown = () => {
    setShowSettingsDropdown(false);
  };

  const swapCoins = () => {
    const tempPayCoin = payCoin;
    const temptokenA = tokenA;
    setPayCoin(receiveCoin);
    setReceiveCoin(tempPayCoin);
    setTokenA(tokenB);
    setTokenB(temptokenA);
  };

  useEffect(() => {
    setFilteredCoins(
      availableCoins.filter((coin) =>
        coin.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  useEffect(() => {
    if (tokenA !== "") {
      // Convert the string value to BigInt and perform the calculation
      const tokenABigInt = BigInt(tokenA);
      setTokenAS(tokenABigInt * BigInt(10 ** 18));
    }
  }, [tokenA]);

  useEffect(() => {
    if (tokenB !== "") {
      // Convert the string value to BigInt and perform the calculation
      const tokenABigInt = BigInt(tokenB);
      setTokenBS(tokenABigInt * BigInt(10 ** 18));
    }
  }, [tokenB]);

  return (
    <div className={styles.swapcontainer}>
      <div className={styles.swappanel}>
        <div className={styles.swapheader}>
          <button className={styles.heading}>Add liquidity</button>
          <button className={styles.iconbtn}>
            <p onClick={openSettingsDropdown}>{maxSlippage}% Slippage</p>
            <FontAwesomeIcon icon={faGear} onClick={openSettingsDropdown} />
          </button>
        </div>
        {/* Settings Dropdown */}
        {showSettingsDropdown && (
          <div className={styles.modalBackdrop}>
            <div className={styles.settingsDropdown}>
              <button
                className={styles.closebutton}
                onClick={closeSettingsDropdown}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
              <br></br>
              <div className={styles.container}>
                <div className={styles.section}>
                  <div className={styles.labelContainer}>
                    <div className={styles.leftLabel}>
                      <p>Max Slippage</p>
                    </div>
                    <div className={styles.rightLabel}>
                      <p>{maxSlippage}%</p>
                    </div>
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      type="number"
                      value={maxSlippage.toString()} // Ensure it's a string
                      onChange={handleMaxSlippageChange}
                      className={styles.inputField}
                      placeholder="0"
                    />
                    <div className={styles.inputText}>%</div>
                  </div>
                </div>
                <div className={styles.section}>
                  <div className={styles.labelContainer}>
                    <div className={styles.leftLabel}>
                      <p>Transaction Deadline</p>
                    </div>
                    <div className={styles.rightLabel}>
                      <p>{transactionDeadline}m</p>
                    </div>
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      type="number"
                      value={transactionDeadline}
                      onChange={handleTransactionDeadlineChange}
                      className={styles.inputField}
                      placeholder="0"
                    />
                    <div className={styles.inputText}>Minutes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={styles.swapbody}>
          <div className={styles.boxs}>
            <div>
              <div className={styles.swapsection}>
                <div className={styles.payinput}>
                  <input
                    type="text"
                    placeholder="0"
                    value={tokenA}
                    onChange={(e) => setTokenA(e.target.value)}
                  />
                  <button
                    className={styles.paycoin}
                    onClick={() => setShowPayModal(true)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "-10px",
                      }}
                    >
                      <img
                        src={getIconForCoin(payCoin)}
                        alt={payCoin}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "5px",
                        }}
                      />
                      <span>{payCoin}</span>
                      <span>▼</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p className={styles.ExButton} onClick={swapCoins}>
                +
              </p>
            </div>
            <div>
              <div className={styles.swapsection}>
                <div className={styles.receiveinput}>
                  <input
                    type="text"
                    placeholder="0"
                    value={tokenB}
                    onChange={(e) => setTokenB(e.target.value)}
                  />
                  <button onClick={() => setShowReceiveModal(true)}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "-10px",
                      }}
                    >
                      <img
                        src={getIconForCoin(receiveCoin)}
                        alt={receiveCoin}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "5px",
                        }}
                      />
                      <span>{receiveCoin}</span>
                      <span>▼</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

          </div>
          <div>
            <br></br>
          </div>
          {mounted && account.isConnected ? (
            <button
              className={styles.swapButton}
              onClick={addLiquidityFunction}
            >
              Add liquidity
            </button>
          ) : (
            <button className={styles.swapButtonDisb}>Connect wallet</button>
          )}
        </div>
      </div>
      {showPayModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.coinmodal}>
            <p>Select a coin</p>
            <button className={styles.closebutton} onClick={closeModal}>
              <FontAwesomeIcon icon={faClose} />
            </button>
            <br></br>
            <input
              type="text"
              placeholder="Search for a coin"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredCoins
              .filter((coin) => coin !== receiveCoin)
              .map((coin) => (
                <button
                  key={coin}
                  className={styles.listbtn}
                  onClick={() => {
                    setPayCoin(coin);
                    closeModal();
                  }}
                >
                  <img
                    src={getIconForCoin(coin)}
                    alt={coin}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "10px",
                    }}
                  />
                  {coin}
                </button>
              ))}
          </div>
        </div>
      )}
      {showReceiveModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.coinmodal}>
            <p>Select a coin</p>
            <button className={styles.closebutton} onClick={closeModal}>
              <FontAwesomeIcon icon={faClose} />
            </button>
            <br></br>
            <input
              type="text"
              placeholder="Search for a coin"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredCoins
              .filter((coin) => coin !== payCoin)
              .map((coin) => (
                <button
                  key={coin}
                  className={styles.listbtn}
                  onClick={() => {
                    setReceiveCoin(coin);
                    closeModal();
                  }}
                >
                  <img
                    src={getIconForCoin(coin)}
                    alt={coin}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "10px",
                    }}
                  />
                  {coin}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Swap;
