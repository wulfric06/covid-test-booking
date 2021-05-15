module.exports = {

  /**
   * Get the role details attached with the user
   */
  getFilteredUserDetails: async (user) => {
    const { password, loginToken, ...innerUser } = { ...user };
    return innerUser;
  }
};
