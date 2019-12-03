import React from "react";
import SimpleMap from "../common/Map";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import HeadShot from "../assets/Lucas-headshot.png";

const useStyles = makeStyles({
  about: {
    padding: 20
  },
  img: {
    width: "100%"
  }
});

const About = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={8} className={classes.about}>
          <p>
            Lucas Albano is a computer science student from Boca Raton Florida.
            He studied computer science at Florida State University. He is
            working as a software developer at a local company. Over his time
            studying at school, he felt that as soon as he graduated, all
            studying would be over and he would only be working. He soon
            realized that there is still so much more that he had to learn. He
            found himself make flashcards to study the technologies he was using
            at work. Of course, he enjoyed the material he was learning, but he
            felt like there should be a better and easier way to study. So he
            built one.
          </p>
          <p>
            TestMaster is a one-stop-shop for all studying needs. Students and
            non-students can create a cardset and start added definitions. they
            can then swipe through the definitions and test themselves until
            mastery! Users can add and delete cardsets. Add, delete, update, and
            switch cards very easily!
          </p>
          <p>
            Plans include:
            <ul>
              <li>
                integrated quizzes that include multiple-choice, true/false and
                fill in the blank!
              </li>
              <li>
                Customizable cardset organization based on class, genre, or
                relevance.
              </li>
              <li>
                integration Artifical intelligence that learns how you like to
                study and suggest the best methods to use.
              </li>
            </ul>
          </p>
        </Grid>
        <Grid item xs={4} className={classes.img}>
          <img src={HeadShot} alt="Lucas Albano" />
        </Grid>
      </Grid>
      <SimpleMap />
    </div>
  );
};

export default About;
