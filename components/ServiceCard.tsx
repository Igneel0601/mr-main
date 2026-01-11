import React from 'react'

interface ServiceCardProps {
  title?: string
  subtitle?: string
  imageSrc?: string
  children?: React.ReactNode
}

/**
 * Reusable ServiceCard component.
 * Usage examples:
 * <ServiceCard title="SEO" subtitle="On-page & off-page">\n *   <p>Some rich JSX content here</p>\n * </ServiceCard>
 *
 * You can also render MDX into the `children` if you adopt an MDX pipeline.
 */
export default function ServiceCard({ title, subtitle, imageSrc, children }: ServiceCardProps) {
  return (
    <div className="service-card-root">
      {imageSrc && (
        <div className="service-card-image">
          <img src={imageSrc} alt={title ?? 'service'} />
        </div>
      )}

      <div className="service-card-body">
        {title && <h3 className="service-card-title">{title}</h3>}
        {subtitle && <p className="service-card-subtitle">{subtitle}</p>}
        <div className="service-card-content">{children}</div>
      </div>
    </div>
  )
}
