// src/pages/Contact.js
import React from 'react';
import styled from 'styled-components';

const Contact = () => {
    return (
        <ContactContainer>
            <Title>Contact Us</Title>
            <Description>
                We'd love to hear from you! Whether you have feedback, questions, or suggestions, feel free to reach out to us.
            </Description>
            <ContactForm>
                <Label>
                    Name:
                    <Input type="text" name="name" />
                </Label>
                <Label>
                    Email:
                    <Input type="email" name="email" />
                </Label>
                <Label>
                    Message:
                    <Textarea name="message"></Textarea>
                </Label>
                <Button type="submit">Send</Button>
            </ContactForm>
        </ContactContainer>
    );
};

const ContactContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 2rem;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
  height: 100px;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default Contact;
