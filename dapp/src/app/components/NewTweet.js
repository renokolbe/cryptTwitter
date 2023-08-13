"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addTweet } from "../services/Web3Service";

export default function NewTweet(){

    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
    const {push} = useRouter();

    function btnPublishClick(){
        setMessage("Mensagem sendo enviada para a BlockChain");
        addTweet(text)
            .then(result =>{
                setText("");
                setMessage("Mensagem enviada. Aguarde para atualizar");
            })
            .catch(err => {
                console.error(err);
                setMessage(err.message);
            });
    }

    useEffect(() => {
        const wallet = localStorage.getItem("wallet");
        if (!wallet) push("/");
    }, []);

    return(
        <>
            <div className="top">
                <div className="left">
                    <img src="/twitter.svg" className="brand" />
                </div>
                <h1>Bom estar de volta!</h1>
                <p>O que manda?</p>
                <textarea className="form-control my-3" value={text} onChange={evt => setText(evt.target.value)}
                ></textarea>
                <div>
                    <input type="button" className="btn btn-primary" value="Enviar" onClick={btnPublishClick}/>
                    <spam className="message">{message}</spam>
                </div>
            </ div>
        </>
    )
}