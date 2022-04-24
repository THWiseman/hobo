const Game = (props) => {
    const appId = props.appId;
    //const imgURL = "http://media.steampowered.com/steamcommunity/public/images/apps/" + appId + "/" + imgIconUrl;
    const bannerURL = "https://steamcdn-a.akamaihd.net/steam/apps/" + appId + "/header.jpg";

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-3"}>
            <img src={bannerURL}/>
                </div>
                <div className={"col-9 my-auto"}><h4>{"HI"}</h4></div>
            </div>
        </div>
    );
}

export default Game;