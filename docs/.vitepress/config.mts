import {defineConfig} from "vitepress";
import {SearchPlugin} from "vitepress-plugin-search";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Software Defined \n Infrastructure",
    description: "A VitePress Site",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: "Home", link: "/"},
        ],

        sidebar: [
            {
                text: "Modules",
                collapsed: true,
                items: [
                    {text: "SSH known hosts", link: "/modules/known_hosts.md"},
                ],
            },
            {
                text: "Tools",
                collapsed: true,
                items: [
                    {text: "Collection", link: "/collection/terraform.md"},
                ],
            },
            {
                text: "Manual server management",
                collapsed: true,
                items: [
                    {
                        text: "1. Server creation",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_1/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_1/prerequisites.md"},
                            {
                                text: "Step-by-Step Instruction",
                                link: "/exercise/exercise_1/step-by-step.md",
                                collapsed: true,
                                items: [
                                    {text: "1. Firewall", link: "/exercise/exercise_1/step-by-step/firewall.md"},
                                    {text: "2. Create Server", link: "/exercise/exercise_1/step-by-step/create-server.md"},
                                    {text: "3. Reset Root Password", link: "/exercise/exercise_1/step-by-step/reset-root-password.md"},
                                    {text: "4. Connect Server", link: "/exercise/exercise_1/step-by-step/connect-server.md"},
                                    {text: "5. Delete Server", link: "/exercise/exercise_1/step-by-step/delete-server.md"},
                                ]
                            },
                            {text: "Summary", link: "/exercise/exercise_1/summary.md"},
                            {text: "References", link: "/exercise/exercise_1/references.md"},
                            {text: "Code", link: "/exercise/exercise_1/code/code.md"},
                        ],
                    },
                    {
                        text: "2. Server re-creation",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_2/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_2/prerequisites.md"},
                            {
                                text: "Step-by-Step Instruction",
                                link: "/exercise/exercise_2/step-by-step.md",
                                collapsed: true,
                                items: [
                                    {text: "List ip's", link: "/exercise/exercise_2/step-by-step/list.md"},
                                    {text: "ReCreate a Server", link: "/exercise/exercise_2/step-by-step/recreate.md",},
                                ],
                            },
                            {text: "Summary", link: "/exercise/exercise_2/summary.md"},
                            {text: "References", link: "/exercise/exercise_2/references.md"},
                            {text: "Code", link: "/exercise/exercise_2/code/code.md"},
                        ],
                    },
                    {
                        text: "3. Improve your server's security!",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_3/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_3/prerequisites.md"},
                            {
                                text: "Step-by-Step Instruction",
                                link: "/exercise/exercise_3/step-by-step.md",
                                collapsed: true,
                                items: [
                                    {text: "Setup Nginx", link: "/exercise/exercise_3/step-by-step/nginx.md"},
                                    {text: "Create SSH Key", link: "/exercise/exercise_3/step-by-step/ssh.md"},
                                ],
                            },
                            {text: "Summary", link: "/exercise/exercise_3/summary.md"},
                            {text: "References", link: "/exercise/exercise_3/references.md"},
                            {text: "Code", link: "/exercise/exercise_3/code/code.md"},
                        ],
                    },
                    {
                        text: "4. ssh-agent installation",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_4/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_4/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_4/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_4/summary.md"},
                            {text: "References", link: "/exercise/exercise_4/references.md"},
                            {text: "Code", link: "/exercise/exercise_4/code/code.md"},
                        ],
                    },
                    {
                        text: "5. MI Gitlab access by ssh",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_5/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_5/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_5/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_5/summary.md"},
                            {text: "References", link: "/exercise/exercise_5/references.md"},
                            {text: "Code", link: "/exercise/exercise_5/code/code.md"},
                        ],
                    },
                    {
                        text: "6. ssh host hopping",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_6/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_6/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_6/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_6/summary.md"},
                            {text: "References", link: "/exercise/exercise_6/references.md"},
                            {text: "Code", link: "/exercise/exercise_6/code/code.md"},
                        ],
                    },
                    {
                        text: "7. ssh port forwarding",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_7/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_7/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_7/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_7/summary.md"},
                            {text: "References", link: "/exercise/exercise_7/references.md"},
                            {text: "Code", link: "/exercise/exercise_7/code/code.md"},
                        ],
                    },
                    {
                        text: "8. ssh X11 forwarding",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_8/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_8/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_8/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_8/summary.md"},
                            {text: "References", link: "/exercise/exercise_8/references.md"},
                            {text: "Code", link: "/exercise/exercise_8/code/code.md"},
                        ],
                    },
                    {
                        text: "9. Enabling index based file search",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_9/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_9/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_9/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_9/summary.md"},
                            {text: "References", link: "/exercise/exercise_9/references.md"},
                            {text: "Code", link: "/exercise/exercise_9/code/code.md"},
                        ],
                    },
                    {
                        text: "10. Using the tail -f command",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_10/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_10/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_10/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_10/summary.md"},
                            {text: "References", link: "/exercise/exercise_10/references.md"},
                            {text: "Code", link: "/exercise/exercise_10/code/code.md"},
                        ],
                    },
                ]
            },
            {
                text: "Cloud provider",
                collapsed: true,
                items: [
                    {
                        text: "11. Incrementally creating a base system",
                        collapsed: true,
                        items: [

                            {text: "Introduction", link: "/exercise/exercise_11/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_11/prerequisites.md"},
                            {
                                text: "Step-by-Step Instruction",
                                link: "/exercise/exercise_11/step-by-step.md",
                                collapsed: true,
                                items: [
                                    {text: "Setup", link: "/exercise/exercise_11/step-by-step/setup.md"},
                                ]
                            },
                            {text: "Summary", link: "/exercise/exercise_11/summary.md"},
                            {text: "References", link: "/exercise/exercise_11/references.md"},
                            {text: "Code", link: "/exercise/exercise_11/code/code.md"},
                        ],
                    },
                    {
                        text: "12. Automatic Nginx installation",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_12/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_12/prerequisites.md"},
                            {
                                text: "Step-by-Step Instruction",
                                link: "/exercise/exercise_12/step-by-step.md",
                                collapsed: true,
                                items: [
                                    {text: "Setup", link: "/exercise/exercise_12/step-by-step/setup.md"},
                                ]
                            },
                            {text: "Summary", link: "/exercise/exercise_12/summary.md"},
                            {text: "References", link: "/exercise/exercise_12/references.md"},
                            {text: "Code", link: "/exercise/exercise_12/code/code.md"},
                        ],
                    },
                    {
                        text: "13. Working on Cloud-init",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_13/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_13/prerequisites.md"},
                            {
                                text: "Step-by-Step Instruction",
                                link: "/exercise/exercise_13/step-by-step.md",
                                collapsed: true,
                                items: [
                                    {text: "Setup", link: "/exercise/exercise_13/step-by-step/setup.md"},
                                ]
                            },
                            {text: "Summary", link: "/exercise/exercise_13/summary.md"},
                            {text: "References", link: "/exercise/exercise_13/references.md"},
                            {text: "Code", link: "/exercise/exercise_13/code/code.md"},
                        ],
                    },
                    {
                        text: "14. Solving the ~/.ssh/known_hosts quirk",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_14/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_14/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_14/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_14/summary.md"},
                            {text: "References", link: "/exercise/exercise_14/references.md"},
                            {text: "Code", link: "/exercise/exercise_14/code/code.md"},
                        ],
                    },
                    {
                        text: "15. Auto mounting a volume",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_15/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_15/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_15/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_15/summary.md"},
                            {text: "References", link: "/exercise/exercise_15/references.md"},
                            {text: "Code", link: "/exercise/exercise_15/code/code.md"},
                        ],
                    },
                    {
                        text: "16. Mount point's name specification",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_16/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_16/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_16/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_16/summary.md"},
                            {text: "References", link: "/exercise/exercise_16/references.md"},
                            {text: "Code", link: "/exercise/exercise_16/code/code.md"},
                        ],
                    },
                    {
                        text: "17. A module for ssh host key handling",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_17/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_17/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_17/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_17/summary.md"},
                            {text: "References", link: "/exercise/exercise_17/references.md"},
                            {text: "Code", link: "/exercise/exercise_17/code/code.md"},
                        ],
                    },
                    {
                        text: "18. Enhancing your web server.",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_18/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_18/prerequisites.md"},
                            {
                                text: "Step-by-Step Instruction",
                                link: "/exercise/exercise_18/step-by-step.md",
                                collapsed: true,
                                items: [
                                    {text: "Staging mode", link: "/exercise/exercise_18/step-by-step/staging.md"},
                                    {text: "Production mode", link: "/exercise/exercise_18/step-by-step/production.md"}
                                ]
                            },
                            {text: "Summary", link: "/exercise/exercise_18/summary.md"},
                            {text: "References", link: "/exercise/exercise_18/references.md"},
                            {text: "Code", link: "/exercise/exercise_18/code/code.md"},
                        ],
                    },
                    {
                        text: "19. Creating DNS records",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_19/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_19/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_19/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_19/summary.md"},
                            {text: "References", link: "/exercise/exercise_19/references.md"},
                            {text: "Code", link: "/exercise/exercise_19/code/code.md"},
                        ],
                    },
                    {
                        text: "20. Creating a host with corresponding DNS entries",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_20/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_20/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_20/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_20/summary.md"},
                            {text: "References", link: "/exercise/exercise_20/references.md"},
                            {text: "Code", link: "/exercise/exercise_20/code/code.md"},
                        ],
                    },
                    {
                        text: "21. Creating a fixed number of servers",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_21/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_21/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_21/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_21/summary.md"},
                            {text: "References", link: "/exercise/exercise_21/references.md"},
                            {text: "Code", link: "/exercise/exercise_21/code/code.md"},
                        ],
                    },
                    {
                        text: "22. Creating a web certificate",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_22/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_22/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_22/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_22/summary.md"},
                            {text: "References", link: "/exercise/exercise_22/references.md"},
                            {text: "Code", link: "/exercise/exercise_22/code/code.md"},
                        ],
                    },
                    {
                        text: "23. Testing your web certificate",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_23/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_23/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_23/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_23/summary.md"},
                            {text: "References", link: "/exercise/exercise_23/references.md"},
                            {text: "Code", link: "/exercise/exercise_23/code/code.md"},
                        ],
                    },
                    {
                        text: "24. Combining certificate generation and server creation",
                        collapsed: true,
                        items: [
                            {text: "Introduction", link: "/exercise/exercise_24/introduction.md"},
                            {text: "Prerequisites", link: "/exercise/exercise_24/prerequisites.md"},
                            {text: "Step-by-Step Instruction", link: "/exercise/exercise_24/step-by-step.md"},
                            {text: "Summary", link: "/exercise/exercise_24/summary.md"},
                            {text: "References", link: "/exercise/exercise_24/references.md"},
                            {text: "Code", link: "/exercise/exercise_24/code/code.md"},
                        ],
                    },
                ]
            },
        ],

        socialLinks: [
            {icon: "GitHub", link: "https://github.com/vuejs/vitepress"},
        ],
    },

    markdown: {
        config: (md) => {
            let counter = [0, 0, 0];
            md.core.ruler.push("custom_numbering", function (state) {
                counter = [0, 0, 0];
                state.tokens.forEach((token, idx) => {
                    if (token.type === "heading_open") {
                        const level = parseInt(token.tag[1]);
                        if (level >= 1 && level <= 3) {
                            counter[level - 1]++;
                            for (let i = level; i < 3; i++) counter[i] = 0;
                            const headingIndex = counter.slice(0, level).join(".");
                            const inline = state.tokens[idx + 1];
                            inline.content = `${headingIndex} ${inline.content}`;
                        }
                    }
                });
            });
        },
    },

    vite: {
        plugins: [
            SearchPlugin({
                previewLength: 50,
                buttonLabel: "Suche",
                placeholder: "Dokumentation durchsuchen...",
                tokenize: "full",
                //indexOptions: defaultOptions, // oder weglassen
            }),
        ],
    },
});
