import React, { useState, useEffect } from 'react';
import './footer.css';
import { FaGithub, FaHeart } from 'react-icons/fa';


function Footer() {
  const linkedInProfiles = [
    { name: 'Yash Gupta', link: 'https://www.linkedin.com/in/yashsgupta/' },
    { name: 'Nikhil Sethuram', link: 'https://www.linkedin.com/in/nikhilsethuramth/' },
    { name: 'Adish Jain', link: 'https://www.linkedin.com/in/adish-jain-958b3225b/' },
    { name: 'Amitav Rawat', link: 'https://www.linkedin.com/in/amitav-rawat-386061206/' },
  ];

  const githubLink = 'https://github.com/yashg4509/UWMadisonCourseNotif';
  const donateLink = 'https://fundly.com/uw-madison-course-notification';

  const getLastCommit = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/yashg4509/UWMadisonCourseNotif/commits');
      const commits = await response.json();
      const lastCommit = commits[0];
      return lastCommit.sha.substring(0, 7);
    } catch (error) {
      console.error('Error fetching GitHub commits:', error);
      return 'N/A';
    }
  };

  const formatCommitDate = (commitDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(commitDate).toLocaleDateString(undefined, options);
  };

  const [lastCommitInfo, setLastCommitInfo] = useState('');

  useEffect(() => {
    const getLastCommitInfo = async () => {
      const lastCommitSha = await getLastCommit();
      const lastCommitDate = await getCommitDate(lastCommitSha);
      const formattedDate = formatCommitDate(lastCommitDate);
      const commitInfo = `Last updated: ${formattedDate}`;
      setLastCommitInfo(commitInfo);
    };

    getLastCommitInfo();
  }, []);

  const getCommitDate = async (commitSha) => {
    try {
      const response = await fetch(`https://api.github.com/repos/yashg4509/UWMadisonCourseNotif/commits/${commitSha}`);
      const commit = await response.json();
      const commitDate = commit.commit.author.date;
      return commitDate;
    } catch (error) {
      console.error('Error fetching commit date:', error);
      return 'N/A';
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-made-by">
          Made by:
          {linkedInProfiles.map((profile, index) => (
            <a key={index} href={profile.link} target="_blank" rel="noopener noreferrer">
              {profile.name}
            </a>
          ))}
        </div>
        <div className="footer-buttons my-4">
          <a className="github-button" href={githubLink} target="_blank" rel="noopener noreferrer">
            <span className="github-icon">
              <FaGithub />
            </span>
            <span className="github-text">GitHub</span>
          </a>
          {/* <a className="donate-button orange" href={donateLink} target="_blank" rel="noopener noreferrer">
            <span className="donate-icon">
              <FaHeart />
            </span>
            Donate
          </a> */}
        </div>
        <div className="footer-statement">Unaffiliated with UW Madison</div>
        <div className="footer-last-updated">{lastCommitInfo}</div>
      </div>
    </footer>
  );
}

export default Footer;
