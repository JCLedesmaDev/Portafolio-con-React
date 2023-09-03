import { multipleCategories, singleCategory } from "./category.mapper"
import { multipleProjects, singleProject } from "./project.mapper"
import { multipleSkills } from "./skills.mapper"
import { multipleTechnologies, singleTechnology } from "./technology.mapper"
import { user } from "./user.mapper"

const mappers = {
    user,
    singleTechnology,
    singleCategory,
    singleProject,
    multipleSkills,
    multipleTechnologies,
    multipleCategories,
    multipleProjects,
}

export default mappers