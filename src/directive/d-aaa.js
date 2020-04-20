const directive = {
  inserted(el, binding) {
    const { conditions } = binding;
    if (conditions) {
      // todo
    } else {
      throw new Error(
        `need roles! Like v-permission="['keyword','any-other-keyword']"`,
      );
    }
  },
};

export default directive;
