const Game = (props) => {
    const gameObj = props.gameObj
    const title = gameObj.name;
    const appId = gameObj.appid;
    const imgIconUrl = gameObj.img_icon_url + ".jpg"
    const imgURL = "http://media.steampowered.com/steamcommunity/public/images/apps/" + appId + "/" + imgIconUrl;
    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-1"}>
            <img src={imgURL}/>
                </div>
                <div className={"col-10 my-auto"}><h4>{title}</h4></div>
            </div>
        </div>
    );
}

export default Game;