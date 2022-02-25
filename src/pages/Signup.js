import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/signup-illustration.svg";
import logo from "images/logo.svg";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";

const logoLinkUrl = "#";
const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
.iconContainer {
${tw`bg-white p-2 rounded-full`}
}
.icon {
${tw`w-4`}
}
.text {
${tw`ml-4`}
}
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
.icon {
${tw`w-6 h-6 -ml-2`}
}
.text {
${tw`ml-3`}
}
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
${props => `background-image: url("${props.imageSrc}");`}
${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

// const logoLinkUrl = "#";
const illustrationImageSrc = illustration;
const headingText = "Sign Up For Treact";
const socialButtons = [
  {
    iconImageSrc: googleIconImageSrc,
    text: "Sign Up With Google",
    url: "https://google.com"
  },
  {

    iconImageSrc: twitterIconImageSrc,
    text: "Sign Up With Twitter",
    url: "https://twitter.com"


  }
];
const submitButtonText = "Sign Up";
const SubmitButtonIcon = SignUpIcon;
const tosUrl = "#";
const privacyPolicyUrl = "#";
const signInUrl = "#";


export default class signup extends React.Component {
  constructor(props) {
    super(props);
    // Don't do this!
    this.state = {
      username: '',
      dateOfBirth: '',
      email: '',
      password: '',
      errormsg: '',
      accepTerms: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }


  handleSubmit = () => {
    const { username, dateOfBirth, email, password,accepTerms } = this.state;
    var error = 0;
    if (username == '') {
      this.setState({
        errormsg: 'Enter the username',
      });
      error++;
    }
    if (dateOfBirth == '' && error == 0) {
      this.setState({
        errormsg: 'Enter the D.O.B',
      });
      error++;
    }
    if (email == '' && error == 0) {
      this.setState({
        errormsg: 'Enter the Email',
      });
      error++;
    }
    if (password == '' && error == 0) {
      this.setState({
        errormsg: 'Enter the password',
      });
      error++;
    }
    if (accepTerms == '' && error == 0) {
      this.setState({
        errormsg: 'please select a accept and terms',
      });
      error++;
    }
    if (error == 0 ){
      let formData = new FormData();
      formData.append('username',email);
      formData.append('name',username);
      formData.append('dateBirth', dateOfBirth);
      formData.append('password', password);
      formData.append('accept_terms', accepTerms);
      
      fetch("http://finder-back.localhost/register",
          {
              body: formData,
              method: "post"
          })
          .then(response => response.json())
          .then(data => console.log(data));

      this.setState({
        errormsg: 'Form sumbitted',
      });

        console.log(this.state);

    }


  }
  render() {



    const { username, dateOfBirth, email, password, errormsg } = this.state;

    return (
      <AnimationRevealPage>
        <Container>
          <Content>
            <MainContainer>
              <LogoLink href={logoLinkUrl}>
                <LogoImage src={logo} />
              </LogoLink>
              <MainContent>


                <Heading>{headingText}</Heading>
                <FormContainer>
                  <SocialButtonsContainer>
                    {socialButtons.map((socialButton, index) => (
                      <SocialButton key={index} href={socialButton.url}>
                        <span className="iconContainer">
                          <img src={socialButton.iconImageSrc} className="icon" alt="" />
                        </span>
                        <span className="text">{socialButton.text}</span>
                      </SocialButton>
                    ))}
                  </SocialButtonsContainer>
                  <DividerTextContainer>
                    <DividerText>Or Sign up with your e-mail</DividerText>

                  </DividerTextContainer>
                   {errormsg}
                  <Input type="text" name="username" value={username} onChange={this.handleChange} placeholder="Name" />
                  <Input type="Date" name="dateOfBirth" value={dateOfBirth} onChange={this.handleChange} placeholder="D.O.B" />
                  <Input type="email" name="email" value={email} onChange={this.handleChange} placeholder="Email" />
                  <Input type="password" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
                  <SubmitButton onClick={this.handleSubmit} >
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                  <p tw="mt-6 text-xs text-gray-600 text-center">
                  <input name="accepTerms" type="checkbox"  checked={this.state.accepTerms} onChange={this.handleChange} /> I agree to abide by treact's{" "}
                    <a href={tosUrl} tw="border-b border-gray-500 border-dotted">
                      Terms of Service
                  </a>{" "}
                  and its{" "}
                    <a href={privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
                      Privacy Policy
                  </a>
                  </p>

                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
                      Sign In
                  </a>
                  </p>
                </FormContainer>
              </MainContent>
            </MainContainer>
            <IllustrationContainer>
              <IllustrationImage imageSrc={illustrationImageSrc} />
            </IllustrationContainer>
          </Content>
        </Container>
      </AnimationRevealPage>
    )
  }
}




