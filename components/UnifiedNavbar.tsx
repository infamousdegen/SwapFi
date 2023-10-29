import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/logo.png";
import styles from "../assets/styles/UnifiedNavbar.module.css";
import useIsMounted from "./hooks/useIsMounted";
import { useAccount, useNetwork } from "wagmi";
import { Lato } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";



const UnifiedNavbar = () => {
  const router = useRouter();
  const mounted = useIsMounted();
  const account = useAccount();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/landing">
          <Image src={Logo} alt="Logo" width={130} height={50} />
        </Link>
      </div>

      {mounted && account.isConnected ? (
        <ul className={styles.links1}>
          <li>
            <Link
              href="/swap"
              className={router.pathname === "/swap" ? styles.activeLink : ""}
            >
              Swap
            </Link>
          </li>
          <li>
            <Link
              href="/tokens"
              className={router.pathname === "/tokens" ? styles.activeLink : ""}
            >
              Tokens
            </Link>
          </li>
          <li>
            <Link
              href="/pools"
              className={router.pathname === "/pools" ? styles.activeLink : ""}
            >
              Pools
            </Link>
          </li>
          <li>
            <Link
              href="/buy"
              className={router.pathname === "/buy" ? styles.activeLink : ""}
            >
              Buy
            </Link>
          </li>
        </ul>
      ) : (
        <ul className={styles.links}>
          <li>
            <Link
              href="/swap"
              className={router.pathname === "/swap" ? styles.activeLink : ""}
            >
              Swap
            </Link>
          </li>
          <li>
            <Link
              href="/tokens"
              className={router.pathname === "/tokens" ? styles.activeLink : ""}
            >
              Tokens
            </Link>
          </li>
          <li>
            <Link
              href="/pools"
              className={router.pathname === "/pools" ? styles.activeLink : ""}
            >
              Pools
            </Link>
          </li>
          <li>
            <Link
              href="./buy"
              className={
                router.pathname === "./buy"
                  ? styles.activeLink
                  : ""
              }
            >
              Buy
            </Link>
          </li>
        </ul>
      )}
      <div className={styles.button}>
        <ConnectButton showBalance={false}  />
      </div>
    </nav>
  );
};


export default UnifiedNavbar;
