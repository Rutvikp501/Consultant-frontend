  export const showAnimation = (delay=1) => {
         return {
            hidden: {
              opacity: 0,
            },
            show: {
              opacity: 1,
              transition: {
                duration: 2,
                delay
              },
            },
          };
  };