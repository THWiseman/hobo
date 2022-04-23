import {useSelector} from "react-redux";
import Game from '../components/game.js'

const Curators = () => {
    const userList = useSelector(state => state.users)
    const game = {"appid":220,"name":"Half-Life 2","playtime_forever":40,"img_icon_url":"fcfb366051782b8ebf2aa297f3b746395858cb62","has_community_visible_stats":true,"playtime_windows_forever":0,"playtime_mac_forever":0,"playtime_linux_forever":0};
    return (
        <div>
            <Game gameObj={game}/>
            <h2>Curators</h2>
            {userList.map(u =>
                <li key={u._id}>
                    {u._id}
                    {u.userName}
                </li>
            )
            }
        </div>
    )
}

export default Curators;