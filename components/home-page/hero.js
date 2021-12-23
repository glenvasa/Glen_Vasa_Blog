import classes from './hero.module.css'
import Image from 'next/image'

function Hero() {
    return <section className={classes.hero}>
        <div className={classes.image}>
            <Image src='/images/site/doom.jpg' alt='image of Glen' width={300} height={300}/>
        </div>
        <h1>Hi, I'm Glen</h1>
        <p>I blog about full-stack web development</p>
    </section>
}

export default Hero