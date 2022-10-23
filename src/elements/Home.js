import styled from "styled-components";
import Post from "./Post";
import Topbar from "./Topbar";
import Trending from "./Trending";
import axios from "axios";
import TokenContext from "../contexts/TokenContext";
import { useContext, useEffect, useState } from "react";
import routes from "../backendroutes";
import { useParams } from "react-router-dom";

export default function Home() {
    const { token } = useContext(TokenContext);
    const id = useParams().id;
<<<<<<< HEAD
    const [posts, setPosts] = useState([]);
    const [inserturl, setInserturl] = useState("");
    const [insertdesc, setInsertdesc] = useState("");
    const [userimage, setUserimage] = useState(""); //precisa pegar a url da imagem do usuario atual
    useEffect(() => {
        if (id) {
            axios.get(routes.GET_POSTS_BYID(id), { headers: { Authorization: token } }).then((res) => { setPosts(res.data) })
                .catch((err) => { console.error(err) });
        } else {
            axios.get(routes.GET_POSTS, { headers: { Authorization: token } }).then((res) => { setPosts(res.data) })
                .catch((err) => { console.error(err) });
        }
    });
    function handleForm(e) {
=======
    const [posts,setPosts] = useState([]);
    const [message,setMessage] = useState("Loading...");
    const [inserturl,setInserturl] = useState("");
    const [insertdesc,setInsertdesc] = useState("");
    const [refresh,setRefresh] = useState(false);
    const [userimage,setUserimage] = useState("");
    const [disable,setDisable] = useState(false);
    const [buttontext,setButtontext] = useState("Publicar");
    useEffect(()=>{
        if(id){
            axios.get(routes.GET_POSTS_BYID(id), {headers: { Authorization: token }}).then((res)=>{(res.data.posts.length)>0?setPosts(res.data.posts):setMessage("There are no posts yet")})
            .catch((err)=>{console.error(err);alert("An error occured while trying to fetch the posts, please refresh the page")});
        }else{
            axios.get(routes.GET_POSTS, {headers: { Authorization: token }}).then((res)=>{setUserimage(res.data.user[0].pictureUrl);(res.data.posts.length)>0?setPosts(res.data.posts):setMessage("There are no posts yet")})
            .catch((err)=>{console.error(err);alert("An error occured while trying to fetch the posts, please refresh the page")});
        }
    },[refresh,id,token]);
    function handleForm(e){
>>>>>>> b6fe9b34e5ddc24bfc53778cf1a5873f0596b244
        e.preventDefault();
        setDisable(true);
        setButtontext("Publishing...")
        const senddata = {
            url: inserturl,
            complement: insertdesc
        }
<<<<<<< HEAD
        axios.post(routes.INSERT_POST, senddata, { headers: { Authorization: token } }).catch((err) => { console.error(err); if (err.request.status === 422) { alert("Url inválida") } });
=======
        axios.post(routes.INSERT_POST, senddata,{headers: { Authorization: token }}).then(()=>{setDisable(false);setRefresh(!refresh);setInsertdesc("");setInserturl("");setButtontext("Publicar");})
        .catch((err)=>{console.error(err);setDisable(false);setButtontext("Publicar");if(err.request.status===422){alert("Url inválida")}else{alert("Houve um erro ao publicar seu link")}});
>>>>>>> b6fe9b34e5ddc24bfc53778cf1a5873f0596b244
    }
    return (
        <>
<<<<<<< HEAD
            <Topbar />
            <CONTENT>
                <TOPTIMELINE>
                    {posts.length > 0 && id ? `${posts[0].username}'s posts` : 'timeline'}
                </TOPTIMELINE>
                <TIMELINE>
                    <POSTS>
                        {id ? null : <INSERTPOST>
                            <LEFTPOST>
                                <USERIMAGE src={userimage} />
                            </LEFTPOST>
                            <RIGTHPOST>
                                <INSERTPOSTMESSAGE>What are you going to share today?</INSERTPOSTMESSAGE>
                                <FORM onSubmit={handleForm}>
                                    <INPUT h="30px"
                                        value={inserturl}
                                        onChange={(e) => setInserturl(e.target.value)}
                                        type="text"
                                        placeholder="http://..."
                                        required
                                    />
                                    <INPUT h="66px"
                                        value={insertdesc}
                                        onChange={(e) => setInsertdesc(e.target.value)}
                                        type="text"
                                        placeholder="Awesome article about #javascript"
                                        required
                                    />
                                    <BUTTON type="submit">Confirmar</BUTTON>
                                </FORM>
                            </RIGTHPOST>
                        </INSERTPOST>}
                        {posts.map((item, index) => { return <Post key={index} id={item.id} content={item.content} link={item.link} url={item.pictureUrl} username={item.username} userid={item.userId} token={token} /> })}
                    </POSTS>
                    <Trending />
                </TIMELINE>
            </CONTENT>
=======
        <Topbar/>
        <CONTENT>
            <TOPTIMELINE>
                {posts.length>0 && id?`${posts[0].username}'s posts`:'timeline'}
            </TOPTIMELINE>
            <TIMELINE>
                <POSTS>
                    {id?null:<INSERTPOST>
                        <LEFTPOST>
                            <USERIMAGE src={userimage}/>
                        </LEFTPOST>
                        <RIGTHPOST>
                            <INSERTPOSTMESSAGE>What are you going to share today?</INSERTPOSTMESSAGE>
                        <FORM onSubmit={handleForm}>
                    <INPUT h="30px"
                        disabled={disable}
                        value={inserturl}
                        onChange={(e) => setInserturl(e.target.value)}
                        type="text"
                        placeholder="http://..."
                        required
                    />
                    <INPUT h="66px"
                        disabled={disable}
                        value={insertdesc}
                        onChange={(e) => setInsertdesc(e.target.value)}
                        type="text"
                        placeholder="Awesome article about #javascript"
                    />
                    <BUTTON disabled={disable} type="submit">{buttontext}</BUTTON>
                    </FORM>
                        </RIGTHPOST>
                    </INSERTPOST>}
                    {posts.length>0?posts.map((item,index)=>{return <Post key={index} content={item.content} link={item.link} url={item.pictureUrl} username={item.username} userid={item.userId}/>}):<MESSAGE>{message}</MESSAGE>}
                </POSTS>
                <Trending/>
            </TIMELINE>
        </CONTENT>
>>>>>>> b6fe9b34e5ddc24bfc53778cf1a5873f0596b244
        </>
    );
}

const CONTENT = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: calc(100vh - 72px);
    height: fit-content;
    margin-top: 72px;
    padding: 0 16.66% 0 16.66%;
`;
const TOPTIMELINE = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 160px;
    width: 100%;
    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    font-weight: bold;
    color: #FFFFFF;
`;
const TIMELINE = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: fit-content;
`;

const POSTS = styled.div`
    display: flex;
    flex-direction: column;
    width: 64%;
    height: fit-content;
`;
const INSERTPOST = styled.div`
    display: flex;
    height: 210px;
    width: 100%;
    margin: 0 0 30px 0;
    padding: 18px 18px 18px 18px;
    background-color: #FFFFFF;
    border-radius: 15px;
`;
const LEFTPOST = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 14%;
    height: 100%;
`;
const RIGTHPOST = styled.div`
    width: 86%;
    height: 100%;
`;
const USERIMAGE = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 27px;
    margin-bottom: 20px;
`;
const INSERTPOSTMESSAGE = styled.div`
    display: flex;
    height: 40px;
    width: 100%;
    padding-top: 10px;
    font-family: 'Lato', sans-serif;
    font-weight: lighter;
    font-size: 20px;
    color: #707070;
`;
const FORM = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: calc(100% -55px);
    width: 100%;
`;
const INPUT = styled.input`
    width: 100%;
    height: ${props => props.h};
    margin-bottom: 5px;
    padding-left: 10px;
    background-color: #EFEFEF;
    border: none;
    border-radius: 5px;
    ::placeholder{
        font-family: 'Lato', sans-serif;
        font-weight: lighter;
        font-size: 15px;
        color: #949494;
    }
`;
const BUTTON = styled.button`
    height: 31px;
    width: 112px;
    background-color: #1877F2;
    border-radius: 5px;
    border: none;
    font-family: 'Lato', sans-serif;
    font-weight: bold;
    font-size: 14px;
    color: #FFFFFF;
`;
const MESSAGE = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 150px;
    width: 100%;
    font-family: 'Lato', sans-serif;
    font-weight: bold;
    font-size: 25px;
    color: #FFFFFF
`;