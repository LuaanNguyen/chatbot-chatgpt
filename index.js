import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
  console.log(colors.bold.green("Welcome Luan Dep Trai <3!"));
  console.log(colors.bold.green("Hpw can I help you today?"));

  const chatHistory = []; //store coversation history

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));

    try {
      //construct the message by iterating over the hisotry
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      //Add latest user input
      messages.push({ role: "user", content: userInput });

      //Call the API with the user input
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      //Get Completion text/content
      const completionText = completion.choices[0].message.content;

      if (userInput.toLowerCase() === "exit") {
        console.log(colors.green("Bot: ") + completionText);
        return;
      }
      console.log(colors.green("Bot: ") + completionText);

      //Update chat history with user input and AI responses
      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
