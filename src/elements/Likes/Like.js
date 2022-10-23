import { useState, useEffect, useContext } from "react";
import ReactTooltip from "react-tooltip";
import { CustomBsFillHeart, CustomBsHeart, StyledDiv, TextLike } from './style/like.Style.js';
import * as services from '../../services/linkr.Services.js';
import TokenContext from '../../contexts/TokenContext.js';

function Like({ postId }) {

    const [button, setButton] = useState(false);
    const [count, setCount] = useState(0);
    const [users, setUsers] = useState([]);
    const { setToken, token } = useContext(TokenContext);
    console.log(token);
    useEffect(() => {
        setToken(123)
        const promiseCount = services.getCountLikes(postId);
        promiseCount.then(res => setCount(res.data));
        const promiseUsers = services.getLikesUsers(postId);
        const promiseLikeMe = services.getLikesMe(postId, token);
        promiseLikeMe.then(res => setButton(res.data));
        
        promiseUsers.then(res => {
            if (res.data.lenght < 2) {
                return setUsers(res.data);
            }
            return setUsers(res.data.slice(0, 2));
        });

    },[postId, token])



    function GiveLike({ button, postIdLike, tokenLike }) {
        if (button) {

            return <CustomBsFillHeart onClick={() => {
                const promise = services.deleteLike(postIdLike, tokenLike);
                promise.catch((error) => console.error(error));
                setUsers(users.filter((x, i) => i > 0))
                setCount(count - 1);
                setButton(false);
            }} />
        }

        return <CustomBsHeart onClick={() => {
            const promise = services.postLike(postIdLike, tokenLike);
            promise.catch((error) => console.error(error));
            setCount(count + 1);
            setUsers(['Você', ...users]);
            setButton(true);
        }} />
    }

    function CountLike({ countLike, usersLike }) {
        
        return <>
            <TextLike data-tip data-for="registerTip" >
                {`${countLike} `} Likes
            </TextLike>
            <ReactTooltip
                id="registerTip"
                place="bottom"
                effect="solid"
                backgroundColor="#FFFFFF"
                textColor="#000000">
                {`${usersLike[0] ? usersLike[0] : ""}, ${usersLike[1] ? usersLike[1] : ""} e outras ${(count - 2) > 0 ? count - 2 : count} pessoas`}
            </ReactTooltip>
        </>
    }


    return (

        <StyledDiv >

            <GiveLike button={button} postIdLike={postId} tokenLike={token} />
            <CountLike countLike={count} usersLike={users} ></CountLike>



        </StyledDiv>
    )


}



export { Like };