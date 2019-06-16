/* eslint-disable max-len */
import moment from "moment";
import { Reports } from "../../models/mongo/schema";

const exec = async (msg) => {
  const reports = await Reports.find({ discordName: msg.author.username.toLowerCase() });
    
  if (reports.length) {
    let reportList = "```";
    for (const report of reports) {
      reportList += `${moment(report.timestamp).format("LLL")} - '${report.reason}' - Reported by ${report.reportedBy}\n`;
    }
    reportList += "```";
    return msg.channel.send(reportList);
  } 
  return msg.channel.send("You have not been reported yet!");
};

export { 
  exec,
};
