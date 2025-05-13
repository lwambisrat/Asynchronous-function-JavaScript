// 1 You are building a reminder feature for a task management app. 
// Write an async function that sends a reminder (simulated with
//  console.log) after a delay using setTimeout. The function should
//  return a Promise that resolves after 3 seconds with the message
//  "Reminder sent to user!", and you should await it to log the message.

async function sendReminder() {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("Sending reminder to user...");
        resolve("Reminder sent to user!");
      }, 3000); 
    });
  }
  
  async function main() {
    const reminderResult = await sendReminder();
    console.log(reminderResult);
  }
  main();
  
  // 2 In a startup's DevOps dashboard, implement a setInterval function 
//   that checks server status every 5 seconds by calling an async function
//  checkServer() that returns a Promise resolving to "Server is running"
//  or rejecting with "Server down". Use .then() and .catch() to handle the 
// result and stop the interval after 30 seconds using clearInterval.

async function checkServer() {
    return new Promise((resolve, reject) => {
      const isRunning = Math.random() > 0.5;
      setTimeout(() => {
        if (isRunning) {
          resolve("Server is running");
        } else {
          reject("Server down");
        }
      }, 500);
    });
  }
  
  let intervalId;
  let timer = 0;
  
  intervalId = setInterval(() => {
    checkServer()
      .then(status => console.log(status))
      .catch(error => console.error(error));
  
    timer += 5;
    if (timer >= 30) {
      clearInterval(intervalId);
      console.log("Server status check stopped after 30 seconds.");
    }
  }, 5000); 
  // 3 You're building a system to show multiple notifications to a user. 
//   Create an async function showNotifications that takes an array of 
// messages and shows each message 1 second apart using await and 
// setTimeout wrapped in a Promise. After all messages are shown,
//  log "All notifications sent".

async function showNotifications(messages) {
    for (const message of messages) {
      await new Promise(resolve => {
        setTimeout(() => {
          console.log("Notification:", message);
          resolve();
        }, 1000); 
      });
    }
    console.log("All notifications sent");
  }
  
  const notifications = ["Message 1", "Message 2", "Message 3"];
  showNotifications(notifications);

  //4 In your startup’s API integration, write an async function 
//   fetchDataWithRetry() that tries to fetch data from a mock API 
// (use Promise.reject() for failure), retries up to 3 times with
//  a 2-second delay between attempts using setTimeout, and resolves 
// with "Data fetched" or logs "Failed after 3 attempts" if all fail.

async function fetchDataWithRetry(url, maxRetries = 3, delay = 2000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const data = await new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error("Failed to fetch data"));
          }, 500);
        });
  
        //const response = await fetch(url); 
        //if (!response.ok) {
        //  throw new Error(`HTTP error! status: ${response.status}`);
        //}
        //const data = await response.json();
        console.log("Data fetched");
        return "Data fetched"; 
      } catch (error) {
        console.error(`Attempt ${attempt} failed: ${error.message}`);
        if (attempt === maxRetries) {
          console.log("Failed after 3 attempts");
          return "Failed after 3 attempts";
        }
        await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
      }
    }
  }
  //5 You’re building a countdown timer for a product launch. Write a function that takes 
//   a number n and logs the countdown every second using setInterval. Once it reaches 0, 
// stop the interval and call an async function launchProduct() that returns a resolved
//  Promise with "Product Launched!" and logs it.

async function launchProduct() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("Product Launched!");
      }, 1000);
    });
  }
  
  function countdown(n) {
    let count = n;
    const intervalId = setInterval(() => {
      console.log(count);
      count--;
  
      if (count < 0) {
        clearInterval(intervalId);
        launchProduct().then(message => console.log(message));
      }
    }, 1000);
  }
  
  countdown(3);



