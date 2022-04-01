import React from "react";
import { IoMoon, IoSunny, IoSearch } from "react-icons/io5";
import moment from "moment";
import "./App.css";

function App() {
  const [dark, setDark] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const [userInfo, setUserInfo] = React.useState({
    login: "",
    url: "",
    avatar: "",
    joined: "",
    repos: "",
    followers: "",
    following: "",
    bio: "",
    infoOn: false,
    isLoading: false,
  });

  const darkTheme = () => {
    setDark(!dark);
  };

  const searchGitUser = async () => {
    setUserInfo({
      isLoading: true,
    });
    await fetch("https://api.github.com/users/" + search, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo({
          login: data.login,
          url: data.url,
          avatar: data.avatar_url,
          joined: data.created_at,
          repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          bio: data.bio,
          infoOn: true,
          isLoading: false,
        });
        console.log(data);
      }, [])
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={!dark ? "github-app light-theme" : "github-app dark-theme"}>
      <div className="container">
        {/* top header */}
        <div className="top-header">
          <div className="left-header">Git Finder</div>
          <div className="switch" onClick={darkTheme}>
            {!dark ? (
              <>
                <span>DarkMode</span>
                <IoMoon color="#1F2A48" />
              </>
            ) : (
              <>
                <span>LightMode</span>
                <IoSunny color="#F5F8FF" />
              </>
            )}
          </div>
        </div>

        {/* search bar */}
        <div className="search-bar">
          <IoSearch color="027AFF" size={30} />
          &nbsp;
          <input
            placeholder="Search GitHub username..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button className="btn-theme" onClick={searchGitUser}>
            {userInfo.isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* search-results */}

        {userInfo.infoOn ? (
          <div className="search-results-box">
            <div className="profile-section">
              <div id="section-1">
                <img
                  src={
                    userInfo.avatar === ""
                      ? "./github-logo.png"
                      : userInfo.avatar
                  }
                  alt="profile-img"
                  className="img-profile"
                />
              </div>
              <div id="section-2">
                <div className="info-user">
                  <h1>
                    <span>{userInfo.login}</span>
                    <br />
                    <a href={userInfo.url} target="_blank">
                      @{userInfo.login}
                    </a>
                  </h1>
                  <h5 className="text-moving">
                    Joined {moment(userInfo.joined).format("DD MMM YYYY")}
                  </h5>
                </div>
                <p className="paragraph">
                  {userInfo.bio === null
                    ? "-- No bio added from user --"
                    : userInfo.bio}
                </p>
                <div className="repo-box">
                  <div className="repos">
                    <h2>Repos</h2>
                    <span>{userInfo.repos === 0 ? "--" : userInfo.repos}</span>
                  </div>
                  <div className="followers">
                    <h2>Followers</h2>
                    <span>
                      {userInfo.followers === 0 ? "--" : userInfo.followers}
                    </span>
                  </div>
                  <div className="following">
                    <h2>Following</h2>
                    <span>
                      {userInfo.following === 0 ? "--" : userInfo.following}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
