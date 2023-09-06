import './style/contact.css'
import logo from '../../assets/logo.svg'
import GeneralHeader from '../../components/generalHeader'
import ContactCard from './contactCard'
import Dropdown from './dropdown'

export default function Contact() {
    return (
        <div>
        <div className='contact--wrapper'>
            <div className='general-header-wrapper'>
                <GeneralHeader name="Contact"/>
            </div>
            <div className="contact--logo">
                <img src={logo} alt="logo"/>
            </div>
            <div className="bold--header">
                <h1>Let us know how we can improve.</h1>
            </div>
            <div className='contact--cards--wrapper'>
                <ContactCard icon={logo} command="Email Us" details="We're here to help" contact="support@twosurf.com"/>
                <ContactCard icon = {logo} command="Call Us" details="Mon-Fri from 8am to 5pm" contact="+1(500)000-0000"/>
            </div>
            <div className='contact--questions'>
                <div className='contact--questions--header'>
                    <h1>Frequently Asked Questions</h1>
                </div>
                <div className='dropdown--wrapper'>
                    <Dropdown question="Is there a free trial available?" hiddenText="Yes! There are currently no plans to paywall Two Surf. We are just as fed up with paying for public data as you are."/>
                    <div className='other--questions'>
                        <Dropdown question="Will you ever have live cams?" hiddenText="We are currently in the process of installing our first livecam in Huntington Beach. Please let us know if you have a recommendation to where the next cam should be installed."/>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}