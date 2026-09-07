import { prisma } from "@/lib/prisma"

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date)
}

export default async function AdminPage() {
  const [leads, contacts] = await Promise.all([
    prisma.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
  ])

  const today = new Date()

  const todaysLeads = leads.filter((lead) => {
    const date = new Date(lead.createdAt)

    return (
      date.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
      }) ===
      today.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
      })
    )
  })

  const todaysContacts = contacts.filter((contact) => {
    const date = new Date(contact.createdAt)

    return (
      date.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
      }) ===
      today.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
      })
    )
  })

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto 30px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            marginBottom: "8px",
            color: "#172033",
          }}
        >
          Kumaran Real Estate
        </h1>

        <p
          style={{
            color: "#687386",
            margin: 0,
          }}
        >
          Admin Dashboard
        </p>
      </div>

      {/* Statistics */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto 35px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <StatCard
          title="Total Leads"
          value={leads.length}
          icon="🏠"
        />

        <StatCard
          title="Contact Enquiries"
          value={contacts.length}
          icon="📩"
        />

        <StatCard
          title="Today's Leads"
          value={todaysLeads.length}
          icon="📅"
        />

        <StatCard
          title="Today's Contacts"
          value={todaysContacts.length}
          icon="📞"
        />
      </div>

      {/* Leads */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto 40px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "25px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          overflowX: "auto",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h2
            style={{
              margin: 0,
              color: "#172033",
              fontSize: "22px",
            }}
          >
            Property Requirements
          </h2>

          <p
            style={{
              marginTop: "6px",
              color: "#687386",
            }}
          >
            Customer requirements submitted through the website
          </p>
        </div>

        {leads.length === 0 ? (
          <p style={{ color: "#687386" }}>
            No property requirements yet.
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "1100px",
            }}
          >
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Phone</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Requirement</TableHeader>
                <TableHeader>Property</TableHeader>
                <TableHeader>Area</TableHeader>
                <TableHeader>Location</TableHeader>
                <TableHeader>Budget</TableHeader>
                <TableHeader>BHK</TableHeader>
                <TableHeader>Date & Time</TableHeader>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "20px",
                        background:
                          lead.intent === "Buy"
                            ? "#e8f5e9"
                            : "#fff3e0",
                        color:
                          lead.intent === "Buy"
                            ? "#2e7d32"
                            : "#e65100",
                        fontWeight: 600,
                      }}
                    >
                      {lead.intent}
                    </span>
                  </TableCell>
                  <TableCell>{lead.propertyType}</TableCell>
                  <TableCell>{lead.area || "-"}</TableCell>
                  <TableCell>{lead.location || "-"}</TableCell>
                  <TableCell>{lead.budget || "-"}</TableCell>
                  <TableCell>{lead.bhk || "-"}</TableCell>
                  <TableCell>
                    {formatDate(lead.createdAt)}
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Contact Messages */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "25px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          overflowX: "auto",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h2
            style={{
              margin: 0,
              color: "#172033",
              fontSize: "22px",
            }}
          >
            Contact Enquiries
          </h2>

          <p
            style={{
              marginTop: "6px",
              color: "#687386",
            }}
          >
            Messages submitted through the contact form
          </p>
        </div>

        {contacts.length === 0 ? (
          <p style={{ color: "#687386" }}>
            No contact enquiries yet.
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "900px",
            }}
          >
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Phone</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Subject</TableHeader>
                <TableHeader>Message</TableHeader>
                <TableHeader>Date & Time</TableHeader>
              </tr>
            </thead>

            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.phone || "-"}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.subject || "-"}</TableCell>

                  <TableCell>
                    <div
                      style={{
                        maxWidth: "350px",
                        whiteSpace: "normal",
                      }}
                    >
                      {contact.message}
                    </div>
                  </TableCell>

                  <TableCell>
                    {formatDate(contact.createdAt)}
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  )
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string
  value: number
  icon: string
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          fontSize: "28px",
          marginBottom: "12px",
        }}
      >
        {icon}
      </div>

      <p
        style={{
          margin: 0,
          color: "#687386",
          fontSize: "14px",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          margin: "6px 0 0",
          fontSize: "30px",
          color: "#172033",
        }}
      >
        {value}
      </h2>
    </div>
  )
}

function TableHeader({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "14px",
        borderBottom: "2px solid #edf0f4",
        color: "#687386",
        fontSize: "13px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </th>
  )
}

function TableCell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <td
      style={{
        padding: "14px",
        borderBottom: "1px solid #edf0f4",
        color: "#273142",
        fontSize: "14px",
        verticalAlign: "top",
      }}
    >
      {children}
    </td>
  )
}