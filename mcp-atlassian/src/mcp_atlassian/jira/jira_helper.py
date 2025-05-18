import os
import json
import sys
from atlassian import Jira

def main():
    try:
        jira_url = os.environ.get("JIRA_URL")
        jira_username = os.environ.get("JIRA_USERNAME")
        jira_api_token = os.environ.get("JIRA_API_TOKEN")
        
        if not all([jira_url, jira_username, jira_api_token]):
            print(json.dumps({"error": "Missing JIRA_URL, JIRA_USERNAME, or JIRA_API_TOKEN environment variables"}), file=sys.stderr)
            sys.exit(1)

        jira = Jira(
            url=jira_url,
            username=jira_username,
            password=jira_api_token,
            cloud=True
        )

        input_data = json.load(sys.stdin)
        action = input_data.get("action")

        if action == "create_issue":
            project_key = input_data.get("project_key")
            summary = input_data.get("summary")
            description = input_data.get("description", "")
            issuetype_name = input_data.get("issuetype_name")

            if not all([project_key, summary, issuetype_name]):
                print(json.dumps({"error": "Missing required arguments for create_issue: project_key, summary, issuetype_name"}), file=sys.stderr)
                sys.exit(1)

            issue_data = {
                "fields": {
                    "project": {
                        "key": project_key,
                    },
                    "summary": summary,
                    "description": description,
                    "issuetype": {
                        "name": issuetype_name,
                    },
                },
            }
            new_issue = jira.issue_create(issue_data)
            print(json.dumps(new_issue))
        else:
            print(json.dumps({"error": f"Unknown action: {action}"}), file=sys.stderr)
            sys.exit(1)

    except Exception as e:
        # Более подробный вывод ошибки, если это ошибка валидации Jira
        if hasattr(e, 'response') and hasattr(e.response, 'json') and callable(e.response.json):
            try:
                error_json = e.response.json()
                error_messages = error_json.get('errorMessages', [])
                errors = error_json.get('errors', {})
                if error_messages or errors:
                    print(json.dumps({"error": "Jira API validation error", "messages": error_messages, "details": errors}), file=sys.stderr)
                else:
                    print(json.dumps({"error": str(e), "response_text": e.response.text if hasattr(e.response, 'text') else 'No response text'}), file=sys.stderr)
            except:
                 print(json.dumps({"error": str(e)}), file=sys.stderr) # Если не удалось распарсить JSON
        else:
            print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()