import React, {useState, useEffect} from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from './styles.js';
import wordsToNumbers from "words-to-numbers";


const alankey = '008693c1a7923470f98b41fab02e4c982e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = ()=>{
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(()=>{
        alanBtn({
            key: alankey,
            onCommand: ({command, articles, number})=>{
                console.log(command); 
                if(command==='newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle)=> prevActiveArticle+1);
                }else if(command==='open'){
                    const parsedNumber = number.length>2 ? wordsToNumbers(number,{fuzzy:true}) : number;
                    const article = articles[parsedNumber-1];
                    window.open(article.url, '_blank');
                    console.log(command)
                    console.log(number)
                    console.log(parsedNumber)

                    // if(parsedNumber>articles.length){
                    //     alanBtn().playText('please try that again');
                    // }else if(article){
                    //     window.open(article.url, '_blank');
                    //     alanBtn.playText('opening..');
                    // }else{
                    //     alanBtn().playText('Please try that again...');
                    // }
                }
            }
        })
    }, [])

    return (
        <div>
           <div className={classes.logoContainer}>
            <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="logo"/>
           </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    );
}

export default App;