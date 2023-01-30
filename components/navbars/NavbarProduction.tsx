import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

// wallet SDK helpers
import { useKryptikAuthContext } from "../KryptikAuthProvider";
import { getUserPhotoPath } from "../../src/helpers/firebaseHelper";
import { useKryptikThemeContext } from "../ThemeProvider";
import toast, { Toaster } from "react-hot-toast";
import { WalletStatus } from "../../src/models/KryptikWallet";

const NavbarProduction: NextPage = () => {
  const [isMenuMobile, setMenuMobile] = useState(false);
  const { authUser, walletStatus } = useKryptikAuthContext();
  const { hideBalances, updateHideBalances } = useKryptikThemeContext();
  const router = useRouter();

  // change style based on boolean
  const menuWrapperClassName = isMenuMobile
    ? "flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0 min-h-[100vh] bg-white dark:bg-black md:min-h-0 text-2xl space-y-2"
    : "hidden text-xl md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0";

  const handleHideBalances = function (isHideBalances: boolean) {
    if (!authUser) {
      toast.error("Please login before updating your preferences");
      return;
    }
    updateHideBalances(isHideBalances, authUser.uid);
    if (isHideBalances) {
      toast("Your balances will now be hidden while browsing");
    } else {
      toast("Your balances will now be visible while browsing");
    }
  };

  return (
    <nav className="py-2 md:py-4">
      <div className="md:px-4 mx-auto md:flex md:items-center">
        <div className="flex justify-between items-center hover:cursor-pointer">
          <div onClick={() => setMenuMobile(false)}>
            <Link href="/">
              <span className="font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-green-500 hover:outline-4 hover:outline-blue-400 dark:hover:text-white transition-colors duration-1500">
                Kryptik
              </span>
            </Link>
          </div>
          <button
            id="nav-icon"
            onClick={() => setMenuMobile(!isMenuMobile)}
            type="button"
            className={`inline-flex ${
              isMenuMobile && "open"
            } items-center mt-2 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="bg-gray-500 dark:bg-gray-400"></span>
            <span className="bg-gray-500 dark:bg-gray-400"></span>
            <span className="bg-gray-500 dark:bg-gray-400"></span>
          </button>
        </div>
        <div
          id="menu"
          className={menuWrapperClassName}
          onClick={() => setMenuMobile(false)}
        >
          {authUser && (
            <div className="ml-2 md:ml-0 md:mr-2">
              {hideBalances ? (
                <RiEyeCloseLine
                  className="dark:text-white hover:cursor-pointer hover:animate-pulse"
                  size="28"
                  onClick={() => handleHideBalances(false)}
                />
              ) : (
                <RiEyeLine
                  className="dark:text-white hover:cursor-pointer hover:animate-pulse"
                  size="28"
                  onClick={() => handleHideBalances(true)}
                />
              )}
            </div>
          )}

          <a href="#"></a>
          {authUser ? (
            <Link href="../profile">
              <span
                className={`p-2 lg:px-4 md:mx-2 text-gray-400 rounded hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700 dark:hover:bg-gray-100 dark:hover:text-black transition-colors duration-300 ${
                  router.pathname == "/profile" ? "font-bold" : ""
                } `}
              >
                Profile
              </span>
            </Link>
          ) : (
            <Link href="../about">
              <span
                className={`p-2 lg:px-4 md:mx-2 text-gray-400 rounded hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700 dark:hover:bg-gray-100 dark:hover:text-black transition-colors duration-300 ${
                  router.pathname == "/about" ? "font-bold" : ""
                } `}
              >
                About
              </span>
            </Link>
          )}
          {!authUser && (
            <Link href="../docs">
              <span
                className={`p-2 lg:px-4 md:mx-2 text-gray-400 rounded hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700 dark:hover:bg-gray-100 dark:hover:text-black transition-colors duration-300 ${
                  router.pathname.startsWith("/docs") ? "font-bold" : ""
                } `}
              >
                Learn
              </span>
            </Link>
          )}
          {authUser && (
            <Link href="../explore">
              <span
                className={`p-2 lg:px-4 md:mx-2 text-gray-400 rounded hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700 dark:hover:bg-gray-100 dark:hover:text-black transition-colors duration-300 ${
                  router.pathname == "/explore" ? "font-bold" : ""
                } `}
              >
                Explore
              </span>
            </Link>
          )}
          {authUser ? (
            <Link href="../gallery">
              <span
                className={`p-2 lg:px-4 md:mx-2 text-green-400 md:text-center border border-transparent rounded hover:text-white hover:cursor-pointer hover:bg-sky-400 dark:hover:text-black transition-colors duration-300 ${
                  router.pathname == "/gallery" ? "font-bold" : ""
                }`}
              >
                Collect
              </span>
            </Link>
          ) : (
            <Link href="../explore">
              <span
                className={`p-2 lg:px-4 md:mx-2 text-green-400 md:text-center border border-transparent rounded hover:text-white hover:cursor-pointer hover:bg-sky-400 dark:hover:text-black transition-colors duration-300 ${
                  router.pathname == "/explore" ? "font-bold" : ""
                }`}
              >
                Explore
              </span>
            </Link>
          )}

          {/* show disconnect button if connected and vise versa */}
          {authUser ? (
            walletStatus == WalletStatus.Connected ? (
              <Link href="../wallet/">
                <span
                  className={`p-2 lg:px-4 md:mx-2 text-green-400 md:text-center md:border md:border-solid border-gray-300 dark:border-gray-600 dark:hover:border-sky-200 rounded hover:bg-green-400 hover:cursor-pointer hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1`}
                >
                  Wallet{" "}
                  <img
                    src={getUserPhotoPath(authUser)}
                    alt="Profile Image"
                    className="inline object-cover w-5 h-5 rounded-full ml-2"
                  />
                </span>
              </Link>
            ) : (
              <Link href="../sync">
                <span
                  className={`p-2 lg:px-4 md:mx-2 text-green-400 md:text-center md:border md:border-solid border-gray-300 dark:border-gray-600 dark:hover:border-sky-200 rounded hover:bg-green-400 hover:cursor-pointer hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1`}
                >
                  Sync Wallet
                </span>
              </Link>
            )
          ) : (
            <Link href="../wallet/create">
              <span
                className={`p-2 lg:px-4 md:mx-2 text-green-400 md:text-center md:border md:border-solid border-gray-300 dark:border-gray-600 dark:hover:border-sky-200 rounded hover:bg-green-400 hover:cursor-pointer hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1`}
              >
                Connect
              </span>
            </Link>
          )}
        </div>
      </div>
      <Toaster />
    </nav>
  );
};

export default NavbarProduction;
