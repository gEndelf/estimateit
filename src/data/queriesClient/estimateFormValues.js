import gql from 'graphql-tag';

const estimateFormValues = gql`
  query estimate($id: String) {
    estimate(id: $id) {
      _id
      owner
      date
      clientName
      projectName
      sprintNumber
      comments
      pm
      skype
      email
      position
      moneyRate
      technologies,
      estimateOptions {
        qa
        pm
        risks
        bugFixes
        probability
        __typename @skip(if: true)
      }
      tasks {
        taskName
        isChecked
        minimumMinutes
        maximumMinutes
        __typename @skip(if: true)
        tasks {
          taskName
          isChecked
          minimumMinutes
          maximumMinutes
          __typename @skip(if: true)
          tasks {
            taskName
            isChecked
            minimumMinutes
            maximumMinutes
            __typename @skip(if: true)
          }
        }
      }
      __typename @skip(if: true)
    }
  }
`;

export default estimateFormValues;