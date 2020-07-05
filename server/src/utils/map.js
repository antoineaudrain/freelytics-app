export const mapExercise = (exercise) => {
  return {
    ...exercise,
    userId: exercise.user_id,
    startedAt: exercise.started_at,
    endedAt: exercise.ended_at,
    exerciseName: exercise.workout_name.toUpperCase(),
  }
}

export const mapUser = (user) => {
  return {
    ...user,
    firstName: user.first_name,
    lastName: user.last_name,
  }
}
