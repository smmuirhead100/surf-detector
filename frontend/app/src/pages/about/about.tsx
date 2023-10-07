import './style/about.css'
import hb from '../../assets/hb.jpg'
import log from '../../assets/log.png'
import GeneralHeader from '../../components/generalHeader'

export default function About(){
    return (
        <div>
        <div className='about-wrapper'>
            <div className='general-header-wrapper'>
                <GeneralHeader name="About"/>
            </div>
            <div className="content-pic">
                    <img src={hb} className="responsive-image" />
            </div>
            <div className='content-quote'>
                <h3>“I started Two Surf when I was two years old; I also happened to get my first barrel at that age, hence the name, Two Surf. Every morning for as long as I can remember, I’ve woken up and checked every single wave at every single spot in the world, logging the conditions to a vast memory storage that is my brain. I’ve developed a state of the art machine learning model in my head with customized weights so that I can wake up every morning and give people an accurate surf report. I am genuinely appreciative of your interest in Two Surf and am open to any suggestions you may have to improve it.”</h3>
                <h2>- Sean Muirhead</h2>
            </div>
            <div className='content-pic'>
                <img src={log} className="responsive-image" />
            </div>
        </div>
        </div>
    )
}