---
title: Forze 9
publishDate: 2022-07-04 00:00:00
img: /assets/forze9.png
img_alt: The Forze 9 with the doors open, in a construction hall.
description: |
  The embedded systems of the Forze 9, the fastest hydrogen race car in the world.
tags:
  - C/C++
  - Embedded
  - Racing
  - Hydrogen
size: Huge
---

Working on this codebase has been an incredible experience for me. It is by far the largest codebase I have ever had the opportunity to work on, with over 2 million lines of code. This presented a fantastic challenge and allowed me to learn extensively about embedded programming and C++ throughout the project.

It is also a fantastic project itself; the Forze 9 project stands at the forefront of sustainable racing, showcasing the potential of hydrogen as a clean and efficient fuel source. By utilizing hydrogen fuel cell technology, the car demonstrates the possibilities of eco-friendly racing and the importance of exploring alternative energy solutions in the motorsports industry. The team's dedication to sustainable racing aligns with the global goal of reducing carbon emissions and promoting a greener future. Please checkout the website of the project at [forzehydrogenracing.com](https://forzehydrogenracing.com/).

#### My contributions
One of my contributions was the creation of the pipeline. Leveraging GitHub Actions, I developed a pipeline that automatically compiles and runs relevant tests whenever a branch is pushed and a pull request is created. This automated process ensures that non-compiling code is not reviewed, saving time and preventing unexpected errors or bugs from entering the master branch. While the pipeline is not flawless, it has proven to be a valuable feature for maintaining code quality and efficiency.

Another area I worked extensively on was the EMCY system, which serves as the car's emergency system. I wrote drivers for specific components to ensure accurate information cascading throughout the vehicle. It was crucial to handle component shutdowns only for the right reasons, as abruptly shutting down related components without proper communication to the driver can be extremely dangerous, especially when driving at high speeds. Implementing this higher-level logic within the low-level embedded code posed a significant challenge, but it was worth it to enhance the car's safety during high-speed driving at 300 kmph.

Additionally, I played a key role in developing the telemetry system. This system facilitates the transmission of data from the car to engineers on the sidelines during races. It plays a critical role in analyzing the car's behavior, including safety and stability assessments and determining if it is possible to push the limits in specific corners. I implemented a long-range solution for transmitting data when the car is far away on the track and a faster short-range solution for quick data dumps when the car is closer to the pit wall.

These contributions allowed me to apply my skills and knowledge in embedded programming, driver development, and data transmission, while also contributing to the overall safety and performance of the car.

Please note that the codebase is owned by the Forze Hydrogen Racing organisation, and I do not own the code. If they ever decide the code will be public, you can find it [here](https://github.com/StichtingFormulaZeroTeamDelft/Software_F9)

#### Detailed Description of the repository
This repository serves as the comprehensive codebase for Forze 9, encompassing both low-level and high-level code utilized in the car. It plays a vital role in the project, and this description provides crucial information about the codebase, including contribution guidelines and adherence to repository rules.

##### IAR Workspace:
The IAR workspace serves as the central part of the entire project, housing all code except for the steering wheel. To access the workspace, open the forze9.eww file with IAR. The workspace is structured based on the cores utilized in the car: Cortex M0+ (KV11), Cortex M4 (LPC4357 OEM), and Cortex M7 (iMX RT1062 OEM). Each core has its corresponding sub-project folder (cortexm0, cortexm4, cortexm7), which contains core-specific files.

The generic folder holds shared files used by all cores. Additionally, each cortexm. folder contains IAR-specific files (.ewp, .ewt, and .eww) that define project structure, configurations, and compiler settings.

The application logic resides in the application folder, with each sub-project having its own folder and specific files. These sub-projects represent different cores and their corresponding functionalities, such as the fuel cell control node of the CPS. The all folder is shared among all workspaces, and the main.c file is executed for each selected workspace. Inside each sub-folder, you will find workspace-specific files included only in the respective workspace.

The cortexm./lib folder contains library files for the associated core, divided into external and internal libraries. External libraries are those not developed by us, while internal libraries are written by our team and subjected to MisraC checks.

The cortexm./drivers folder consists of custom drivers for components used with the respective core. We have developed these drivers, while drivers obtained from external sources are located in the generic/drivers folder.

##### Misra C:
In this project, we adhere to the Misra C 2004 coding standard for ISO C. Although the standard is primarily intended for C, it also applies to C++, which is the main language used in our project. While we follow the majority of the Misra C guidelines, there are some exceptions (rules not followed). The most important rules we comply with include:

- **2.2**:	Code should only use `/* ... */` style comments. `// ...` should only be used for temporary constructors like `TODO`s.
- **6.3**:	Types should indicate size and signedness, e.g. `unsigned long = uint32_t`, `int = uint16_t`, `unsigned char = uint8_t`.
- **8.1**:	Functions should be declared at both the function definition and call.
- **8.3**:	All types of a function declaration should be equal to the types of the function definition.
- **8.5**:	No definitions of objects or functions in a header file.
- **8.11**:	Use `static` only if an object is only used in the file it is declared in.
- **9.3**:	In an enumerator list, either all or none of the members should be initialised.
- **10.1**:	The value of an expression of integer type should not be implicitly converted to an underlying type.
- **10.2**:	The value of an expression of floating type should not be implicitly converted to an underlying type.
- **10.6**:	A `u` suffix should be applied to all constants of the `unsigned` type.
- **11.5**:	No casting is allowed that violates the `const` or `volatile` keywords.
- **12.2**:	The outcome of an expression should not depend on its evaluation order.
- **13.1**:	Assignment operators should not be used in expressions that return a boolean value, e.g. `if ((value = func()) { ... }`.
- **13.3**:	Floating-point expressions should not be tested for equality/inequality.
- **14.1**:	There should not be unreachable code.
- **14.4**:	The use of the `goto` statement is prohibited.
- **14.6**:	In any loop, at most one `break` statement should be used.
- **14.7**:	Every function has a single point of exit, at the end of the function.
- **14.8**:	For every `switch`, `do .. while`, `while` or `for` statements, the `{}` should not be omitted.
- **14.9**:	Do not omit the `{}` for `if`-statements.
- **15.2**:	Every non-empty case of a `switch`-statement should contain a `break`-statement.
- **16.4**:	Identifiers of a function declaration and function definition should be identical.
- **16.5**:	Functions with zero parameters should be declared with the `void` parameter, e.g. `void func(void) { ... }`.
- **19.1**:	`#include`-statements should only be preceded by other preprocessor-directives or comments.
- **19.15**:	Precautions should be taken to ensure a header file is not included more than once.

When compiling a control system, it should be placed in the compiled_simulink directory of the relevant branch. This prevents direct impact on IAR compile targets, allowing the software department to implement control systematically. The agreed-upon workflow entails the simulation and control department committing compiled code to this directory along with a changelog in the commit details. The software department will transfer the compiled Simulink files to IAR and verify the successful compilation of embedded software for each target.

This workflow should be followed separately for each control system (Simulink files), and the compiled_simulink directory should be cleared as part of the software department's implementation commit.

##### Workflow:
To maintain an organized and collaborative development process, we have established a workflow to guide code implementation. The key steps in this workflow are as follows:

1. Create an issue: Before initiating any code changes, create an issue in the repository. This allows all repository members to be aware of the ongoing work. Make sure to choose an appropriate issue template and provide a concise yet detailed name for the issue.

2. Create a branch: Once the issue is created, proceed to create a branch for your work using your preferred naming convention. We recommend starting the branch name with the issue number, followed by a lowercase name separated by dashes. For example, if the issue number is #100 and the issue is titled "Generic Issue Description," the branch name would be 100-generic-issue-description.

3. Implementation: Work towards achieving the goals outlined in the issue. Make commits along the way, ensuring that each commit represents a meaningful step in the implementation process. For guidance on creating effective commit messages, refer to this blog post.

4. Testing: Thoroughly test your code to ensure its correctness and functionality. Pay special attention to safety considerations (see Safety subsection).

5. Pull Request: When your code implementation is complete, create a pull request (PR) to merge your changes into the main/development branch. Detailed instructions for creating a PR are provided in the next section.

##### Pull Requests (PRs):
Pull requests play a critical role in maintaining code quality and allowing for code review by other team members. The PR process involves two main aspects: handling and reviewing.

Handling a PR:
As the author of a PR, it is your responsibility to ensure certain prerequisites are met before creating the PR:

Add documentation for any new or updated functionalities.
Follow our coding guidelines (see Styling Guidelines).
Ensure that all configurations compile successfully, such as by running the batch build in IAR (F8).
Once these prerequisites are fulfilled, create the PR. You will encounter a template that needs to be completed. Provide a detailed description of the added code functionality, describe how it was tested, and include any relevant notes. Additionally, include the line "Closes #xxx" above the description, where "xxx" is the issue number that will be automatically closed when the PR is merged. Add appropriate items to the checklist, such as referencing other PRs that need to be merged before yours.

After publishing the PR, notify the designated reviewers either through the Pull Requests channel or by using the "Reviewers" section in the pull request itself.

Address any comments or suggestions from the reviewers. Either explain your rationale for not making certain changes or implement the suggested modifications