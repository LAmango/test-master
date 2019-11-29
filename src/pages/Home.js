import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeStyles } from "@material-ui/styles";
import study1 from "../assets/lucas.png";
import study2 from "../assets/RDJ.png";
import study3 from "../assets/student.png";
import study5 from "../assets/einstien.png";
import StudyHero from "../assets/study-hero.jpg";

const userStyles = makeStyles(theme => ({
  container: {
    width: "auto",
    padding: 50,
    margin: "auto"
  },
  slider: {
    margin: "auto"
  },
  img: {
    width: "48vw",
    [theme.breakpoints.down("md")]: {
      width: "75%"
    }
  },
  jumbotron: {
    height: 0,
    overflow: "hidden",
    backgroundImage: `url(${StudyHero})`,
    backgroundSize: "cover",
    paddingTop: "calc(591.44 / 1127.34 * 100%)",
    background: "white",
    position: "relative"
  },
  jumbotronInside: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  centering: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  viewportSizing: {
    fontSize: "5vw",
    backgroundColor: "rgba(255,255,255,0.8)"
  },
  viewer: {
    background: theme.palette.primary.main,
    width: "100%"
  },
  sub: {
    margin: "auto",
    padding: "20px 0",
    fontSize: "3vw",
    width: "fit-content"
  },
  hero: {
    width: "inherit"
  },
  subtitle: {
    fontSize: "1vw"
  }
}));

const Home = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };

  const classes = userStyles();
  const list = [study1, study2, study3, study5].map((study, index) => {
    return (
      <div key={index} className={classes.container}>
        <img className={classes.img} src={study} alt={`study${index}`} />
      </div>
    );
  });

  return (
    <div>
      <div className={classes.jumbotron}>
        <div className={classes.jumbotronInside}>
          <div className={classes.centering}>
            <div className={classes.viewportSizing}>TestMaster</div>
            <p className={classes.subtitle}>A Studying Tool for Eveyone!</p>
          </div>
        </div>
      </div>
      <div className={classes.viewer}>
        <div className={classes.sub}>Checkout What People Are Saying!</div>
      </div>
      <Slider className={classes.slider} {...settings}>
        {list}
      </Slider>
    </div>
  );
};

export default Home;
